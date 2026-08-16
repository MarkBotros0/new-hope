import {
  Ambulance,
  Backpack,
  BookOpen,
  BookOpenCheck,
  Brain,
  Briefcase,
  Bus,
  CalendarHeart,
  Church,
  CircleQuestionMark,
  Footprints,
  GraduationCap,
  HandHeart,
  HeartCrack,
  HeartHandshake,
  HeartPulse,
  ImageOff,
  Megaphone,
  MirrorRound,
  PiggyBank,
  Presentation,
  Shield,
  ShoppingBasket,
  Sprout,
  Stethoscope,
  Triangle,
  Users,
  UsersRound,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'

/** One icon per الموضوعات topic, each saying something about the topic itself
 *  — a mirror for self-image, a shield for spiritual warfare — rather than the
 *  same tick eight times over. Anything not named here has no icon: a generic
 *  mark repeated down a list says less than none at all. */
const icons: Record<string, LucideIcon> = {
  'مسح شامل للكتاب المقدس': BookOpen,
  'صور مغلوطة عن الله': ImageOff,
  'الشر والألم': HeartCrack,
  'الثالوث وطبيعة الله': Triangle,
  'الحرب الروحية': Shield,
  'التشكيل الروحي': Sprout,
  'الهوية والقيمة والصورة الذاتية': MirrorRound,
  العلاقات: Users,
  'العلاقة الشخصية مع الله': HeartHandshake,
  'كيف نفهم الكتاب المقدس': BookOpenCheck,
  'التعامل مع الإشكاليات': CircleQuestionMark,
  'حياة التلمذة': Footprints,
  // المحاور الرئيسية الأربعة
  'المحور الروحي والنفسي': HeartPulse,
  'المحور المجتمعي والعلاقاتي': Users,
  'المحور العملي/المهني': Briefcase,
  'المحور الفكري واللاهوتي': Brain,
  // الخدمات المقدَّمة — مركز نيولايف
  'تعليم أكاديمي بمنهج مسيحي': GraduationCap,
  'وجبات مجانية ٣ مرات في الأسبوع': UtensilsCrossed,
  'رعاية صحية': Stethoscope,
  'رعاية نفسية': Brain,
  'توعية للأهالي': Megaphone,
  'توزيع تموين على الأهالي': ShoppingBasket,
  'توزيع شنط وكوبونات للأطفال الجدد في الحضانة، ويونيفورم': Backpack,
  'عمل تدريبات للمدرسين: روحية ومهارية ومعرفية ونفسية': Presentation,
  // الخدمات والأحداث — خدمة الفتيات والسيدات
  'مجموعات التلمذة والادّخار أسبوعيًا': PiggyBank,
  'أيام روحية للسيدات وتوعية نفسية': CalendarHeart,
  'كورسات تدريبية': GraduationCap,
  'رحلات ترفيهية': Bus,
  'لقاء أسبوعي للمنسقات': Users,
  'مؤتمرات روحية': Church,
  'لقاء روحي أسبوعي لمجموعات البنات': UsersRound,
  'أيام روحية للبنات: ترفيهية وتوعية نفسية': HandHeart,
  'قوافل طبية': Ambulance,
}

export function topicIcon(label: string): LucideIcon | undefined {
  return icons[label]
}
