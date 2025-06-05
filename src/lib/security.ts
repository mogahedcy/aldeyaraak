import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import rateLimit from 'express-rate-limit';

// Rate limiting configuration
export const createRateLimit = (windowMs: number, max: number) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: 'تم تجاوز الحد المسموح من المحاولات. يرجى المحاولة مرة أخرى لاحقاً',
      retryAfter: Math.ceil(windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Login rate limiting: 5 attempts per 15 minutes
export const loginRateLimit = createRateLimit(15 * 60 * 1000, 5);

// API rate limiting: 100 requests per 15 minutes
export const apiRateLimit = createRateLimit(15 * 60 * 1000, 100);

// Password validation
export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل');
  }

  if (!/\d/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على رقم واحد على الأقل');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

// Enhanced password hashing
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 14; // Higher salt rounds for better security
  return await bcrypt.hash(password, saltRounds);
};

// Secure password comparison
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// JWT token generation with enhanced security
export const generateToken = (payload: any, expiresIn = '24h'): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign(
    {
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      jti: generateSecureId(), // JWT ID for token blacklisting
    },
    secret,
    {
      expiresIn,
      algorithm: 'HS256',
      issuer: 'aldeyar-jeddah',
      audience: 'aldeyar-admin'
    }
  );
};

// JWT token verification
export const verifyToken = (token: string): any => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    return jwt.verify(token, secret, {
      issuer: 'aldeyar-jeddah',
      audience: 'aldeyar-admin'
    });
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Generate secure random ID
export const generateSecureId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>\"']/g, '') // Remove potentially dangerous characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .slice(0, 1000); // Limit length
};

// SQL injection prevention (for raw queries)
export const escapeSQL = (input: string): string => {
  if (typeof input !== 'string') return '';

  return input.replace(/'/g, "''");
};

// XSS protection
export const escapeHtml = (unsafe: string): string => {
  if (typeof unsafe !== 'string') return '';

  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// CSRF token generation and validation
export const generateCSRFToken = (): string => {
  return generateSecureId();
};

export const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken;
};

// Session management
interface Session {
  id: string;
  adminId: string;
  createdAt: Date;
  lastActivity: Date;
  ipAddress: string;
  userAgent: string;
}

class SessionManager {
  private sessions = new Map<string, Session>();
  private readonly maxSessions = 5; // Max concurrent sessions per admin
  private readonly sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours

  createSession(adminId: string, ipAddress: string, userAgent: string): string {
    const sessionId = generateSecureId();
    const now = new Date();

    // Remove old sessions for this admin
    this.cleanupAdminSessions(adminId);

    const session: Session = {
      id: sessionId,
      adminId,
      createdAt: now,
      lastActivity: now,
      ipAddress,
      userAgent
    };

    this.sessions.set(sessionId, session);
    return sessionId;
  }

  validateSession(sessionId: string): Session | null {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    // Check if session is expired
    if (Date.now() - session.lastActivity.getTime() > this.sessionTimeout) {
      this.sessions.delete(sessionId);
      return null;
    }

    // Update last activity
    session.lastActivity = new Date();
    return session;
  }

  destroySession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  destroyAdminSessions(adminId: string): void {
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.adminId === adminId) {
        this.sessions.delete(sessionId);
      }
    }
  }

  private cleanupAdminSessions(adminId: string): void {
    const adminSessions = Array.from(this.sessions.entries())
      .filter(([_, session]) => session.adminId === adminId)
      .sort(([_, a], [__, b]) => b.lastActivity.getTime() - a.lastActivity.getTime());

    // Keep only the most recent sessions
    if (adminSessions.length >= this.maxSessions) {
      const sessionsToRemove = adminSessions.slice(this.maxSessions - 1);
      for (const [sessionId] of sessionsToRemove) {
        this.sessions.delete(sessionId);
      }
    }
  }

  cleanupExpiredSessions(): void {
    const now = Date.now();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (now - session.lastActivity.getTime() > this.sessionTimeout) {
        this.sessions.delete(sessionId);
      }
    }
  }
}

export const sessionManager = new SessionManager();

// Request validation
export const validateRequest = (request: NextRequest) => {
  const contentType = request.headers.get('content-type');
  const userAgent = request.headers.get('user-agent');
  const referer = request.headers.get('referer');

  // Validate content type for POST/PUT requests
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid content type');
    }
  }

  // Validate user agent
  if (!userAgent || userAgent.length < 10) {
    throw new Error('Invalid user agent');
  }

  // Validate referer for sensitive operations
  if (process.env.NODE_ENV === 'production' && referer) {
    const allowedDomains = [
      process.env.NEXT_PUBLIC_BASE_URL,
      'localhost:3000'
    ];

    const refererDomain = new URL(referer).origin;
    if (!allowedDomains.some(domain => refererDomain.includes(domain || ''))) {
      throw new Error('Invalid referer');
    }
  }
};

// IP address extraction
export const getClientIP = (request: NextRequest): string => {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const connIP = request.headers.get('x-connecting-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (connIP) {
    return connIP;
  }

  return 'unknown';
};

// Audit logging
interface AuditLog {
  timestamp: Date;
  adminId: string;
  action: string;
  resource: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  details?: any;
}

class AuditLogger {
  private logs: AuditLog[] = [];
  private readonly maxLogs = 10000;

  log(entry: Omit<AuditLog, 'timestamp'>): void {
    const auditEntry: AuditLog = {
      ...entry,
      timestamp: new Date()
    };

    this.logs.push(auditEntry);

    // Keep only recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // In production, you would save this to a database
    if (process.env.NODE_ENV === 'development') {
      console.log('Audit Log:', auditEntry);
    }
  }

  getLogs(adminId?: string, limit = 100): AuditLog[] {
    let filteredLogs = this.logs;

    if (adminId) {
      filteredLogs = this.logs.filter(log => log.adminId === adminId);
    }

    return filteredLogs
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
}

export const auditLogger = new AuditLogger();

// Middleware helper for authentication
export const authenticateAdmin = async (request: NextRequest): Promise<any> => {
  const token = request.cookies.get('admin-token')?.value;

  if (!token) {
    throw new Error('No authentication token provided');
  }

  try {
    const decoded = verifyToken(token);

    // Validate session
    const sessionId = request.cookies.get('session-id')?.value;
    if (sessionId) {
      const session = sessionManager.validateSession(sessionId);
      if (!session || session.adminId !== decoded.adminId) {
        throw new Error('Invalid session');
      }
    }

    return decoded;
  } catch (error) {
    throw new Error('Invalid authentication token');
  }
};

// Security headers
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self' https:;"
};

export default {
  validatePassword,
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  sanitizeInput,
  escapeHtml,
  sessionManager,
  auditLogger,
  authenticateAdmin,
  securityHeaders,
  getClientIP,
  validateRequest
};
