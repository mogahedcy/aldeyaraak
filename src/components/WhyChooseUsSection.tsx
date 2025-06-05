import { Shield, Clock, Award, Users, Wrench, MapPin, Phone, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'خبرة 15 عاماً مؤكدة',
    description: 'أكثر من 15 عاماً من الخبرة المتراكمة في تنفيذ جميع أنواع المشاريع بأعلى معايير الجودة',
    highlight: '15 عام',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Shield,
    title: 'ضمان شامل 10 سنوات',
    description: 'نقدم ضمان شامل لمدة 10 سنوات على جميع خدماتنا مع صيانة دورية مجانية',
    highlight: '10 سنوات ضمان',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Users,
    title: '+5000 عميل راضي',
    description: 'أكثر من 5000 عميل راضي عن خدماتنا في جدة والمناطق المحيطة يشهدون على جودة عملنا',
    highlight: '+5000 عميل',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Clock,
    title: 'التزام بالمواعيد',
    description: 'نلتزم بالمواعيد المحددة لتسليم المشاريع دون تأخير مع متابعة دقيقة لجدولة الأعمال',
    highlight: 'التزام تام',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    icon: Wrench,
    title: 'خدمة شاملة متكاملة',
    description: '8 خدمات متخصصة تحت سقف واحد من التصميم والتنفيذ حتى الصيانة والمتابعة',
    highlight: '8 خدمات',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: MapPin,
    title: 'تغطية شاملة لجدة',
    description: 'نغطي جميع أحياء ومناطق جدة والمناطق المحيطة مع فريق عمل متنقل ومتخصص',
    highlight: 'تغطية شاملة',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  }
];

const stats = [
  {
    number: '+5000',
    label: 'مشروع ناجح',
    description: 'مشاريع متنوعة في جميع الخدمات'
  },
  {
    number: '15',
    label: 'عام خبرة',
    description: 'خبرة متراكمة في السوق السعودي'
  },
  {
    number: '8',
    label: 'خدمات متخصصة',
    description: 'خدمات شاملة ومتكاملة'
  },
  {
    number: '24/7',
    label: 'دعم مستمر',
    description: 'خدمة عملاء ودعم فني مستمر'
  }
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            لماذا محترفين الديار الخيار الأول في جدة؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            نفخر بكوننا الشركة الرائدة في مجال المظلات والبرجولات والساندوتش بانل في جدة.
            خبرتنا الطويلة وحرصنا على الجودة جعلنا الخيار الأول لآلاف العملاء الراضين
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center bg-gradient-to-br from-accent/5 to-primary/5 rounded-2xl p-6">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-primary mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.title} className="group hover:shadow-xl transition-all duration-300 bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Feature Header */}
                <div className={`${feature.bgColor} p-6 text-center relative`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} bg-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className={`absolute top-4 right-4 ${feature.color} font-bold text-sm px-3 py-1 bg-white rounded-full shadow-md`}>
                    {feature.highlight}
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    {feature.title}
                  </h3>
                </div>

                {/* Feature Content */}
                <div className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-6">
            محترفين الديار - ثقة وجودة منذ 2009
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">الإشراف من قبل مهندسين خبراء</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">الجودة في اختيار المواد</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">أيادي عمالة ذوي خبرة</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">معايير جودة عالمية</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">فريق فني متخصص</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
