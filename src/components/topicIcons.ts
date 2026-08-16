import {
  BookOpen,
  BookOpenCheck,
  CircleQuestionMark,
  Footprints,
  HeartCrack,
  HeartHandshake,
  ImageOff,
  MirrorRound,
  Shield,
  Sprout,
  Target,
  Triangle,
  Users,
} from 'lucide-react'

/** One icon per الموضوعات topic, each saying something about the topic itself
 *  — a mirror for self-image, a shield for spiritual warfare — rather than the
 *  same tick eight times over. Detail lists that are goals rather than topics
 *  fall through to the target. */
const icons: Record<string, typeof Target> = {
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
}

export function topicIcon(label: string) {
  return icons[label] ?? Target
}
