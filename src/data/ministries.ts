// ---------------------------------------------------------------------------
// New Hope (أمل جديد) — real ministry content.
// Sources (client-supplied):
//   • "New Hope Website Data.docx"
//   • "نبذة عن خدمة تدريب القسس وقادة الشباب السودانيين.docx"
// Only content present in those documents is used here; anything they do not
// provide (contact details, meeting times, photos) is left as PENDING and shown
// as a placeholder.
// ---------------------------------------------------------------------------

/** Marker shown wherever the client still needs to supply real data. */
export const PENDING = '[TO BE CONFIRMED]'

export interface Servant {
  name: string
  role: string
}

export interface Principle {
  title: string
  body: string
}

/** A named pillar or value — Arabic name, its English counterpart, and the
 *  statement that defines it. */
export interface Tenet {
  title: string
  titleEn: string
  body: string
}

export interface ArchivePhoto {
  /** Path under `public/archive/` — web-sized copies of the client's originals. */
  src: string
  alt: string
}

export interface Stat {
  value: string
  label: string
}

export interface AudienceItem {
  /** Optional sub-label (e.g. السيدات / البنات); empty for a single row. */
  label: string
  value: string
}

export interface ProgramDetail {
  heading: string
  /** Plain bullet list (topics, goals). */
  items?: string[]
  /** Titled entries (e.g. the four محاور, each with a description). */
  namedItems?: { title: string; body: string }[]
}

export interface Program {
  title: string
  /** Optional English / secondary name shown alongside the Arabic title. */
  titleEn?: string
  paragraphs: string[]
  /** Small key/value chips (المدة، الفئة، المواد …). */
  meta?: { label: string; value: string }[]
  details?: ProgramDetail
}

export interface ProgramGroup {
  heading?: string
  programs: Program[]
}

export interface MinistrySection {
  /** URL segment for a sub-ministry (`/sudanese/children`). Required on pages
   *  with more than one section so each is linkable from the nav. */
  slug?: string
  /** Heading + eyebrow are shown when a page has more than one section. */
  heading?: string
  /** Short label for the sub-ministry tab (falls back to heading). */
  tabLabel?: string
  eyebrow?: string
  intro?: string[]
  stats?: Stat[]
  vision?: string
  mission?: string
  principles?: Principle[]
  /** Goal checklist, shown directly under the vision. */
  goals?: { label: string; lead?: string; items: string[] }
  programGroups?: ProgramGroup[]
  services?: { label: string; items: string[] }
  audience?: { label: string; lead?: string; items: AudienceItem[] }
  servants?: Servant[]
  /** One line, or several paragraphs when the team story needs them. */
  teamNote?: string | string[]
  /** Placeholder tile count, used only while `archive` is still empty. */
  archiveSlots?: number
  archive?: ArchivePhoto[]
}

export interface Ministry {
  slug: string
  navLabel: string
  title: string
  eyebrow?: string
  description?: string
  /** One-line summary for nav menus and service cards. Condensed from this
   *  ministry's own source text — no new claims are introduced. */
  navBlurb?: string
  /** Photo for the hero's image half. Falls back to the placeholder tile. */
  heroPhoto?: ArchivePhoto
  /** Photo for the home service card, when a different shot reads better at
   *  card size than the page hero does. Defaults to `heroPhoto`. */
  cardPhoto?: ArchivePhoto
  sections: MinistrySection[]
}

// ---------------------------------------------------------------------------
// Service 1 — خدمة الشباب وتدريب القادة. One page for what used to be two:
// the shared umbrella content (vision / mission / principles / team), the
// youth programs (قسم الشباب) and the leadership programs (قسم القادة).
// ---------------------------------------------------------------------------
const youthLeaders: Ministry = {
  slug: 'youth',
  navLabel: 'الشباب وتدريب القادة',
  title: 'خدمة الشباب وتدريب القادة',
  navBlurb:
    'مدارس تلمذة للشباب الجامعي والخريجين، ودبلومات وتدريبات لخدام الكنيسة المحلية وقادة الشباب.',
  heroPhoto: {
    src: '/archive/youth-discipleship-school-group.jpg',
    alt: 'صورة جماعية لمشاركي مدرسة التلمذة في حديقة، يرتدون تيشيرت المدرسة الأبيض.',
  },
  cardPhoto: {
    src: '/archive/youth-discipleship-school-lecture.jpg',
    alt: 'شباب يتابعون محاضرة في مدرسة التلمذة ويدوّنون ملاحظاتهم أمام كتبهم المقدسة.',
  },
  sections: [
    {
      vision:
        'تلمذة وتقديم الرعاية الشخصية وأساسيات الإيمان المسيحي والتشكيل الروحي للشباب الجامعي من سن (١٨–٢٥)، حتى يكون لدى الشباب على الأقل خطوة أولى في العلاقة الشخصية مع الله، والهدف أن يكونوا مؤثرين كخدام وقادة في المجتمع والكنيسة.',
      mission:
        'عمل مدارس تلمذة للشباب وتدريبات لخدام وقادة الشباب بالكنائس.',
      principles: [
        {
          title: 'روح الفريق',
          body: 'فريقنا هو أثمن ما لدينا. معًا نُشكّل جزءًا من جسد المسيح، ونحترم تميّزنا الفردي، ونسعى معًا لنحيا تعاليم المسيح.',
        },
        {
          title: 'الشراكة',
          body: 'نحن مُلتزمون بإقامة شراكة مع الكنائس المحلية والهيئات التي تشاركنا الرؤية لتقديم رسالة الإنجيل.',
        },
      ],
      programGroups: [
        {
          heading: 'قسم الشباب',
          programs: [
            {
              title: 'مدرسة تلمذة',
              titleEn: 'Hope Discipleship School',
              paragraphs: [
                'رؤيتنا تلمذة الشباب الجامعي بشكل كتابي وعملي وروحي ونفسي لكي يكونوا في علاقة صحيحة مع الله ومع أنفسهم ومع الآخرين، وقادرين على معرفة دعوتهم ومؤثرين في كل دوائر تواجدهم.',
                'المدرسة هي مسيرة من التعليم والتشكيل الروحي، لمساعدة الشباب أن يروا الله وأنفسهم ومَن حولهم بشكل مختلف، وليعرفوا هدف وجودهم في الحياة وكيف يحققونه بشكل عملي.',
                'المدرسة عبارة عن مجموعة من المؤتمرات مقسّمة على مدار السنة، ومجموعات متابعة وممارسة بعض التدريبات الروحية أثناء المؤتمرات وبينها.',
              ],
              details: {
                heading: 'الموضوعات',
                items: [
                  'مسح شامل للكتاب المقدس',
                  'صور مغلوطة عن الله',
                  'الشر والألم',
                  'الثالوث وطبيعة الله',
                  'الحرب الروحية',
                  'التشكيل الروحي',
                  'الهوية والقيمة والصورة الذاتية',
                  'العلاقات',
                ],
              },
            },
            {
              title: 'مجموعات تلمذة أونلاين',
              paragraphs: [
                'هي مجموعات للتلمذة خاصة بالشباب الجامعي المغترب خلال فترة الدراسة، نقوم من خلالها بوضع أساسيات الإيمان المسيحي والتدريبات الروحية للتشبّه بصورة المسيح.',
              ],
            },
            {
              title: 'المدرسة الطويلة: نور للأمم',
              paragraphs: [
                'هي مسيرة من التلمذة والتدريب للدخول في أعماق جديدة في الشركة والعلاقة مع الله، حتى نتمكن من الاقتراب أكثر من اكتشاف الدعوة الخاصة بكل شخص.',
                'المدرسة عبارة عن تدريب روحي مكثّف مؤسَّس على تعليم كتابي ولاهوتي وممارسة بعض التدريبات الروحية والعملية اليومية.',
              ],
              meta: [
                { label: 'المدة', value: '٢٢ يومًا متصلة' },
                { label: 'الفئة', value: 'شباب الجامعة وحديثو التخرّج' },
              ],
              details: {
                heading: 'الموضوعات',
                items: [
                  'العلاقة الشخصية مع الله',
                  'كيف نفهم الكتاب المقدس',
                  'التعامل مع الإشكاليات',
                  'حياة التلمذة',
                ],
              },
            },
            {
              title: 'خدمة شباب الخريجين',
              titleEn: 'رحلة أمل — Journey of Hope',
              paragraphs: [
                'تهدف الخدمة إلى تجهيز جيل من الشباب الخريجين المسيحيين ليعيشوا إيمانهم بعمق ونضج ويؤثّروا في دوائرهم المهنية والاجتماعية. يتم ذلك من خلال مساعدتهم على تعميق فهم كتابي ونفسي يساعد في القرارات الهامة للحياة، وفهم معنى الحياة ورسالة العمل، وذلك في مجتمع صحي آمن وداعم، مع تقديم تدريب عملي على القيادة والخدمة.',
                'يخدم البرنامج شباب الخريجين من سن ٢٥ إلى ٤٠ سنة، وذلك من خلال لقاءات نصف شهرية نقوم فيها معًا بالقراءة والدراسة والمناقشة.',
              ],
              meta: [
                { label: 'الفئة', value: 'الخريجون من ٢٥ إلى ٤٠ سنة' },
                { label: 'اللقاءات', value: 'نصف شهرية' },
              ],
              details: {
                heading: 'المحاور الرئيسية الأربعة',
                namedItems: [
                  {
                    title: 'المحور الروحي والنفسي',
                    body: 'تأهيل الشباب ليكونوا ناضجين روحيًا ووجدانيًا، من خلال التدريب على المهارات الحياتية المختلفة في إطار روحي كتابي، والتدريب على التوازن النفسي والروحي مع ضغوطات الحياة.',
                  },
                  {
                    title: 'المحور المجتمعي والعلاقاتي',
                    body: 'تنمية فهم صحيح عن العلاقات في مجتمع آمن يدعم ويشارك التحديات الحقيقية.',
                  },
                  {
                    title: 'المحور العملي/المهني',
                    body: 'دمج الإيمان في الحياة اليومية من خلال التدريب على عيش المبادئ المسيحية في العمل.',
                  },
                  {
                    title: 'المحور الفكري واللاهوتي',
                    body: 'تكوين عقل مسيحي قادر على التفكير والتحليل والدفاع عن الإيمان وسط مجتمع معاصر.',
                  },
                ],
              },
            },
          ],
        },
        {
          heading: 'قسم القادة',
          programs: [
            {
              title: 'دبلومة تدريب وتطوير القادة والخدام',
              paragraphs: [
                'دبلومة تدريب وتطوير الخدام هي برنامج تدريبي لخدام الكنيسة المحلية في مصر، يعمل على تدريب الخادم وتنمية مهاراته الشخصية والروحية والقيادية الأساسية، لتأهيله للخدمة في كنيسته المحلية وتمكينه من مواجهة تحديات الخدمة بمرونة وحكمة.',
                'الدبلومة عبارة عن مجموعة من المؤتمرات ومجموعة من المواد المسجَّلة على المنصة الخاصة بالمؤسسة، بالإضافة إلى بعض التكاليف التطبيقية على المواد المقدَّمة.',
              ],
              details: {
                heading: 'هدف الدبلومة',
                items: [
                  'إعداد خدام مؤهلين روحيًا وقياديًا وشخصيًا للخدمة الفعّالة داخل الكنائس المحلية.',
                  'تكوين خدام يعيشون نموذج المسيح في القيادة والخدمة والتلمذة، وتمكينهم من تلبية احتياجات الكنيسة بشكل مثمر وفعّال.',
                  'تقديم تدريبات عملية على الخدمة والتخطيط والرعاية الكنسية، بما يسهم في تطوير الخدمة داخل الكنيسة.',
                ],
              },
            },
            {
              title: 'دبلومة تدريب وتطوير القادة والخدام أونلاين',
              paragraphs: [
                'الهدف منها إعداد خادم مؤهل روحيًا ولاهوتيًا ونفسيًا ومهاريًا للخدمة في كنيسته المحلية، وذلك من خلال حضور مؤتمرات وتدريبات ولقاءات زووم، وحضور مواد أونلاين، وعمل مشروع تخرّج يحوي خطة يمكن تنفيذها في الكنائس المحلية.',
                'الدبلومة مكثّفة، تحتوي على ٢٤ مادة موزّعة على ١٣ أسبوعًا (١٢ لقاء زووم أسبوعي و١٢ مادة أونلاين مسجَّلة على المنصة التعليمية الخاصة بالمؤسسة)، بالإضافة إلى أسبوع ختام وتقديم المشروع النهائي.',
              ],
              meta: [
                { label: 'المواد', value: '٢٤ مادة' },
                { label: 'المدة', value: '١٣ أسبوعًا' },
              ],
            },
            {
              title: 'شراكات مع خدام الكنائس',
              paragraphs: [
                'عمل شراكة مع كنائس في أماكن تحتاج لخدمة، بغرض عمل تدريب متخصص للخدام بحسب احتياج الكنيسة، من خلال تصميم برامج مخصصة يتم توظيفها لتطوير خدام الكنيسة بحسب قطاعاتها المتنوعة.',
              ],
            },
          ],
        },
      ],
      servants: [
        { name: 'كيرلس عياد', role: 'مسؤول خدمة الشباب' },
        { name: 'ساندي سامي', role: 'عضو فريق خدمة الشباب' },
      ],
      archiveSlots: 4,
      archive: [
        {
          src: '/archive/youth-discipleship-school-group.jpg',
          alt: 'صورة جماعية لمشاركي مدرسة التلمذة في حديقة، يرتدون تيشيرت المدرسة الأبيض.',
        },
        {
          src: '/archive/youth-discipleship-school-lecture.jpg',
          alt: 'شباب يتابعون محاضرة في مدرسة التلمذة ويدوّنون ملاحظاتهم أمام كتبهم المقدسة.',
        },
        {
          src: '/archive/leaders-evangelical-council-training-2025.jpg',
          alt: 'مدرِّب يعرض المادة على الشاشة أمام الخدام المشاركين في تدريب المجمع الإنجيلي ٢٠٢٥.',
        },
        {
          src: '/archive/leaders-upper-egypt-training-2025.jpg',
          alt: 'خدام من كنائس الصعيد يتابعون تدريب القادة ٢٠٢٥ داخل الكنيسة.',
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Service 2 — السودانيين (Sudanese ministry in Egypt). Sections on one page:
// the Child ministry (NewLife Center) and the Girls & Women ministry.
// ---------------------------------------------------------------------------
const sudanese: Ministry = {
  slug: 'sudanese',
  navLabel: 'السودانيين',
  title: 'خدمة السودانيين بمصر',
  navBlurb: 'خدمة الأطفال والسيدات والقادة السودانيين اللاجئين في مصر.',
  heroPhoto: {
    src: '/archive/sudanese-children-students-in-class.jpg',
    alt: 'تلاميذ سودانيون على مقاعدهم داخل الفصل وأمامهم كتبهم المصوّرة.',
  },
  sections: [
    {
      eyebrow: 'خدمة السودانيين بمصر',
      slug: 'children',
      heading: 'خدمة الطفل السوداني — مركز نيولايف',
      tabLabel: 'الطفل السوداني',
      intro: [
        'مركز نيولايف لتعليم الأطفال السودانيين. نحن نخدم الأطفال المسيحيين السودانيين اللاجئين في مصر بعد الحرب الأخيرة في شمال السودان، في منطقة عين شمس ومنطقة الورشة بمدينة نصر. وعدد الأطفال حتى الآن ١٠٧٠ طفلًا، ومن المتوقع مع العام الجديد أن يصل العدد إلى ١٢٠٠ طفل.',
      ],
      stats: [
        { value: '١٠٧٠', label: 'طفل حتى الآن' },
        { value: '١٢٠٠', label: 'متوقع مع العام الجديد' },
        { value: '٨٦', label: 'فردًا في فريق العمل' },
        { value: '٦–١٢', label: 'الأعمار المستهدفة (بالسنوات)' },
      ],
      vision:
        'خدمة وبناء جيل يعرف الله، مؤهَّل أكاديميًا، مُعافى نفسيًا وجسديًا.',
      services: {
        label: 'الخدمات المقدَّمة',
        items: [
          'تعليم أكاديمي بمنهج مسيحي',
          'وجبات مجانية ٣ مرات في الأسبوع',
          'رعاية صحية',
          'رعاية نفسية',
          'توعية للأهالي',
          'توزيع تموين على الأهالي',
          'توزيع شنط وكوبونات للأطفال الجدد في الحضانة، ويونيفورم',
          'عمل تدريبات للمدرسين: روحية ومهارية ومعرفية ونفسية',
        ],
      },
      servants: [
        { name: 'تيتو آدم', role: 'مسؤول لوجستيات ومخازن' },
        {
          name: 'ريما صموئيل',
          role: 'مساعدة مدير الخدمة ومساعدة في أحد مراكز عين شمس',
        },
      ],
      teamNote: 'يبلغ عدد فريق العمل الحالي بالمركز ٨٦ فردًا.',
      archiveSlots: 3,
      archive: [
        {
          src: '/archive/sudanese-children-teacher-in-class.jpg',
          alt: 'أطفال سودانيون بالزيّ المدرسي الأحمر مع مدرّسهم أمام فصلهم بمركز نيولايف.',
        },
        {
          src: '/archive/sudanese-children-students-in-class.jpg',
          alt: 'تلاميذ سودانيون على مقاعدهم داخل الفصل وأمامهم كتبهم المصوّرة.',
        },
        {
          src: '/archive/sudanese-children-mathematics-class.jpg',
          alt: 'مدرّس يشرح درس القيمة المكانية في الرياضيات أمام لوحة مكتوبة بخط اليد.',
        },
        {
          src: '/archive/sudanese-children-counting-technique.jpg',
          alt: 'طفلة تتدرّب على العدّ باستخدام خرزات العدّ فوق مقعدها في الفصل.',
        },
      ],
    },
    {
      eyebrow: 'خدمة السودانيين بمصر',
      slug: 'women',
      heading: 'خدمة الفتيات والسيدات السودانيات',
      tabLabel: 'الفتيات والسيدات',
      intro: [
        'كانت البداية في سبتمبر ٢٠٢٣ بمجموعات الادّخار للسيدات السودانيات القادمات إلى القاهرة بعد أحداث أبريل ٢٠٢٣، بهدف تمكين السيدة السودانية المعيلة لأسرتها لتستطيع أن تعيش هي وأسرتها حياة متزنة ماديًا؛ وذلك بتوفير جزء من دخلها أسبوعيًا لتستلم المبلغ بعد سنة فتتمكن من عمل مشروع يكون مصدر دخل، مع إمكانية الاقتراض بعد ٦ أشهر من بداية الادّخار لعمل مشروع لزيادة الدخل أيضًا.',
        'ومع الوقت بدأت الخدمة تفكّر في أن هذه المساحة الآمنة يمكن من خلالها خدمة السيدات روحيًا عبر لقاء أسبوعي، فبدأت التلمذة بحفظ آية أسبوعيًا، ثم درس تلمذة روحي أسبوعي للمجموعات.',
        'وبلغ عدد هذه المجموعات ١٢ مجموعة (تلمذة وادّخار): ٣ مجموعات في عين شمس و٩ مجموعات بمدينة نصر، ويتراوح عدد أفراد المجموعة من ١٨ إلى ٣٠ سيدة، وزمن المجموعة ساعتان أسبوعيًا.',
        'كما تخدم الخدمة بنات السيدات في مجموعات تلمذة روحية أسبوعية، من خلال ٧ منسقات سودانيات متعاونات مع الخدمة؛ بدأنا بـ٤ منسقات، ومع زيادة عدد المجموعات بلغن ٧ منسقات.',
      ],
      stats: [
        { value: '١٢', label: 'مجموعة تلمذة وادّخار' },
        { value: '٧', label: 'منسقات سودانيات' },
        { value: '١٨–٣٠', label: 'سيدة في كل مجموعة' },
        { value: 'ساعتان', label: 'أسبوعيًا لكل مجموعة' },
      ],
      vision:
        'أن تتمتع السيدة السودانية المعيلة لأسرتها بحياة كريمة وسويّة روحيًا ونفسيًا وماديًا، لمجابهة الحياة مع أفراد أسرتها.',
      audience: {
        label: 'الفئة العمرية المستهدفة',
        items: [
          {
            label: 'السيدات',
            value:
              'سيدة سودانية قادمة بعد الحرب (١٥ أبريل ٢٠٢٣)، من سن ٢٥ إلى ٤٥ سنة',
          },
          {
            label: 'البنات',
            value:
              'بنات السيدات بمجموعات التلمذة والادّخار، من سن ١٨ إلى ٢٨ سنة',
          },
        ],
      },
      services: {
        label: 'الخدمات والأحداث',
        items: [
          'مجموعات التلمذة والادّخار أسبوعيًا',
          'أيام روحية للسيدات وتوعية نفسية',
          'كورسات تدريبية',
          'رحلات ترفيهية',
          'لقاء أسبوعي للمنسقات',
          'مؤتمرات روحية',
          'لقاء روحي أسبوعي لمجموعات البنات',
          'أيام روحية للبنات: ترفيهية وتوعية نفسية',
          'قوافل طبية',
        ],
      },
      servants: [],
      teamNote: '٧ منسقات سودانيات متعاونات لخدمة السيدات والبنات.',
      archiveSlots: 3,
      archive: [
        {
          src: '/archive/sudanese-women-discipleship-event.jpg',
          alt: 'سيدات سودانيات في لقاء عبادة وتسبيح ضمن فعاليات مجموعات التلمذة.',
        },
        {
          src: '/archive/sudanese-women-discipleship-meeting.jpg',
          alt: 'سيدات سودانيات يقفن في حلقة للصلاة والتسبيح خلال لقاء مجموعة تلمذة.',
        },
      ],
    },
    {
      eyebrow: 'خدمة السودانيين بمصر',
      slug: 'pastors',
      heading: 'خدمة تطوير وتأهيل القسس وقادة الشباب السودانيين',
      tabLabel: 'القسس وقادة الشباب',
      intro: [
        'نحن خدمة أمل جديد، نعمل في عدة مجالات لخدمة المجتمع السوداني ومن بينها خدمة تأهيل وتطوير قادة الشباب السودانيين والقسوس، من خلال التلمذة والتدريب العملي والبرامج الروحية والقيادية، بهدف مساعدتهم على قيادة كنائسهم واجتماعاتهم وخدماتهم بصورة أكثر نضجًا وفاعلية واحترافية، وإعدادهم للخروج من إطار الكنيسة والوصول إلى الشباب خارجها، خاصة الشباب السودانيين في ظروف اللجوء، وبناء جسور معهم تقود إلى الاستعادة والرعاية والتلمذة.',
        'نؤمن أن القيادة المسيحية الفعالة لا تقوم على المهارات القيادية وحدها، بل تحتاج إلى قائد متكامل يتمتع بعمق روحي، ومعرفة كتابية راسخة، ونضج وصحة نفسية، وقدرة على التأثير والقيادة، وقلب رعوي مستعد للخروج إلى حيث يوجد الناس وخدمتهم.',
      ],
      stats: [
        { value: '٢٠–٤٥', label: 'الفئة العمرية المستهدفة (بالسنوات)' },
        { value: 'شهريًا', label: 'يوم روحي للقادة' },
        { value: 'كل ٣ أشهر', label: 'مؤتمر قيادي تدريبي' },
        { value: '٤', label: 'محاور للتأهيل: روحيًا وكتابيًا ونفسيًا وقياديًا' },
      ],
      vision:
        'بناء قادة أصحاء روحيًا وكتابيًا ونفسيًا وقياديًا، وإرسالهم إلى الكنائس والمجتمع للوصول إلى الشباب المهمَّشين، وخاصة الشباب السودانيين في اللجوء، واستعادتهم إلى حياة الإيمان والمجتمع والتلمذة، وإعدادهم ليصبحوا قادة مؤثرين.',
      goals: {
        label: 'هدفنا',
        lead: 'تطوير قادة قادرين على:',
        items: [
          'قيادة الكنائس والاجتماعات والخدمات بكفاءة واحترافية.',
          'التعامل مع التحديات الروحية والقيادية بصورة ناضجة.',
          'بناء خدمات قائمة على كلمة الله والتلمذة.',
          'النمو المستمر في الشخصية والروحيات والقيادة.',
          'التأثير الإيجابي في الشباب والكنيسة والمجتمع.',
          'الخروج من إطار الكنيسة للوصول إلى الشباب الموجودين خارجها، خاصة الشباب المهمَّشين والمتأثرين بظروف اللجوء والتفكك الأسري.',
        ],
      },
      programGroups: [
        {
          heading: 'برامج وأنشطة الخدمة',
          programs: [
            {
              title: 'اليوم الروحي الشهري',
              paragraphs: [
                'يُقام يوم روحي مرة كل شهر، يركز على الصلاة، والعبادة، ودراسة كلمة الله، والتلمذة، وبناء العلاقات، وتجديد حياة القادة روحيًا.',
              ],
              meta: [{ label: 'التكرار', value: 'مرة كل شهر' }],
            },
            {
              title: 'المؤتمر القيادي',
              paragraphs: [
                'مؤتمر تدريبي كل ثلاثة أشهر يهدف إلى تأهيل القادة الشباب روحيًا وكتابيًا ونفسيًا وقياديًا، وتطوير مهاراتهم في قيادة الكنائس والخدمات، وتجهيزهم للخروج خارج إطار الكنيسة للوصول إلى الشباب المهمَّشين، خاصة الشباب السودانيين في اللجوء، وبناء علاقات آمنة معهم، ورعايتهم وتلمذتهم واستعادتهم إلى الله والكنيسة والمجتمع، بما يؤهل القادة ليكونوا صانعي تغيير وقادة للجيل القادم.',
              ],
              meta: [{ label: 'التكرار', value: 'كل ثلاثة أشهر' }],
            },
            {
              title: 'الزيارات والمتابعة الميدانية',
              paragraphs: [
                'زيارات تفقدية للقادة والكنائس بهدف فهم احتياجاتهم، وتشجيعهم، ومتابعة نموهم، وتقديم الدعم والمساندة، وربط التدريب باحتياجات الخدمة الفعلية، ومتابعة جهود القادة في الوصول إلى الشباب خارج إطار الكنيسة ورعايتهم وتلمذتهم.',
              ],
            },
          ],
        },
      ],
      audience: {
        label: 'الفئة المستهدفة',
        lead: 'تخدم الخدمة بصورة أساسية الشباب والقادة من ٢٠ إلى ٤٥ سنة، وتشمل:',
        items: [
          { label: '', value: 'قادة وخدام الشباب.' },
          { label: '', value: 'القسوس والقادة الشباب في الكنائس.' },
          { label: '', value: 'الخدام الذين لديهم مسؤوليات قيادية.' },
          { label: '', value: 'الشباب الذين لديهم دعوة واستعداد للخدمة والقيادة.' },
        ],
      },
      servants: [],
      teamNote: [
        'الخدمة حاليًا في مرحلة نمو وتأسيس، ويتم التخطيط والتنسيق والإدارة الأساسية من خلال قائد الخدمة، مع الاستعانة بمجموعة من الشباب المتطوعين في تنفيذ الفعاليات، خاصة في الجوانب التنظيمية واللوجستية مثل تجهيز الأجهزة، وإعداد أماكن الاجتماعات، والاستقبال، وتجهيز الاستراحات والوجبات.',
        'ونسعى في المرحلة القادمة إلى بناء "فريق خدمة متكامل" يضم مسؤولين عن التدريب، والمتابعة والتلمذة، والإدارة، والإعلام، واللوجستيات، والرعاية، بما يسمح بتوسيع نطاق الخدمة وزيادة قدرتها على الوصول إلى القادة والكنائس.',
      ],
      archiveSlots: 3,
    },
  ],
}

export const ministries: Ministry[] = [youthLeaders, sudanese]

export function getMinistry(slug: string | undefined): Ministry | undefined {
  return ministries.find((m) => m.slug === slug)
}

/** Resolve a sub-ministry URL segment to its index on the page. Unknown or
 *  missing segments fall back to the first section. */
export function sectionIndex(ministry: Ministry, sub: string | undefined): number {
  const i = ministry.sections.findIndex((s) => s.slug === sub)
  return i === -1 ? 0 : i
}

export function sectionPath(ministry: Ministry, section: MinistrySection): string {
  return section.slug ? `/${ministry.slug}/${section.slug}` : `/${ministry.slug}`
}

// ---------------------------------------------------------------------------
// Navigation model
// ---------------------------------------------------------------------------

export interface NavNode {
  label: string
  path: string
  blurb?: string
  /** The service's own hero photo, reused on the home cards. */
  photo?: ArchivePhoto
  /** Sub-ministries, surfaced as a nested menu so none is hidden behind a tab. */
  children?: NavNode[]
}

/** The الخدمات menu, derived from the ministries so the two never drift.
 *  A page with more than one section contributes a nested level. */
export const serviceNav: NavNode[] = ministries.map((m) => ({
  label: m.navLabel,
  path: `/${m.slug}`,
  blurb: m.navBlurb,
  photo: m.cardPhoto ?? m.heroPhoto,
  children:
    m.sections.length > 1
      ? m.sections.map((s) => ({
          label: s.tabLabel ?? s.heading ?? '',
          path: sectionPath(m, s),
        }))
      : undefined,
}))

// ---------------------------------------------------------------------------
// Site-level content (home + من نحن).
// Every line below is lifted from the ministry content above or from the
// client's own naming; nothing about the organisation is invented. Facts the
// documents do not cover (founding story, contact details) stay PENDING.
// ---------------------------------------------------------------------------

export const site = {
  name: 'أمل جديد',
  nameEn: 'New Hope',
  tagline: 'خدمة الشباب وتدريب القادة · خدمة السودانيين بمصر',
  /** Home hero — describes only the work documented on the service pages. */
  intro:
    'خدمة أمل جديد تعمل على تلمذة الشباب وتأهيل القادة والخدام في الكنائس المحلية، وعلى خدمة المجتمع السوداني في مصر: أطفالًا وسيدات وقادة.',
  /** Shared across the organisation — currently documented under خدمة الشباب. */
  principles: youthLeaders.sections[0].principles ?? [],
} as const

// ---------------------------------------------------------------------------
// من نحن — the organisation's own statement of identity: vision, mission,
// the three pillars the work rests on, and the seven values it is held to.
// Client-supplied and reproduced verbatim; nothing here is paraphrased.
// ---------------------------------------------------------------------------
export const about = {
  vision:
    'أن نمجّد الله من خلال الوصول إلى المحتاجيين لرسالة الرجاء في المسيح.',
  mission: [
    'نلتزم في أمل جديد بأن نُعلن محبة المسيح ورجاءه في كنائسنا، من خلال الوصول للناس غير الموصول إليهم برسالة الإنجيل، ومرافقتهم في مسيرة تلمذة حيّة، وتمكين الكنائس لتعيش دعوتها وتخدم مجتمعاتها بفعالية.',
    'نحرص أن نحقق هذا الالتزام بالشراكة مع الكنائس المحلية، وبطرق تحترم السياقات الثقافية والاجتماعية، وتُراعي احتياجات الأفراد والمجتمعات.',
  ],
  pillars: [
    {
      title: 'الكرازة',
      titleEn: 'Evangelism',
      body: 'مشاركة الناس برسالة محبة المسيح وخلاصه، ودعوتهم لاتباعه كتلاميذ حقيقيين يعيشون له ويشبهونه. مع مراعاة السياقات الثقافية والاجتماعية، والحساسية الدينية والسياسية، وخصوصية كل الفئات المختلفة.',
    },
    {
      title: 'التلمذة',
      titleEn: 'Discipleship',
      body: 'مسيرة مستمرة نعيشها مع أشخاص يسعون لاتباع المسيح، تشمل التعليم، والتشكيل الروحي، والرعاية، بهدف أن ينمو التلميذ ليحيا بحسب صورة المسيح، ويشارك الإنجيل مع الآخرين — مع مراعاة اختلاف النِسب بين هذه المكونات حسب مرحلة النضج الروحي، والاحتياجات النفسية، والسياق الثقافي، والعمر.',
    },
    {
      title: 'تمكين الكنائس',
      titleEn: 'Church Empowerment',
      body: 'العمل مع الكنائس المحلية لتشجيعها وتقويتها لتعيش دعوتها كجسد حيّ للمسيح، ينمو في العمق الروحي، ويُعبّر عمليًا عن محبة المسيح من خلال أعمال الرحمة. يشمل ذلك بناء القدرات (Capacity Building) للقادة والفرق والخدمات، مع مراعاة السياق المحلي واحتياجات كل كنيسة ودورها في مجتمعها.',
    },
  ] as Tenet[],
  values: [
    {
      title: 'النزاهة',
      titleEn: 'Integrity',
      body: 'نلتزم بالشفافية والأمانة في خدمتنا وعلاقاتنا ووقتنا ومواردنا أمام الله والآخرين.',
    },
    {
      title: 'المسؤولية',
      titleEn: 'Accountability',
      body: 'نلتزم بمحاسبة بعضنا البعض بالمحبة ووضع أهداف للمشاريع وفريق العمل نعمل معًا لتحقيقها.',
    },
    {
      title: 'القيادة الخادمة',
      titleEn: 'Servant Leadership',
      body: 'قيادتنا الخدمية ملتزمة بالخدمة بمحبة وتواضع وصدق ودعم وتوجيه وكرم وغفران وانضباط ذاتي.',
    },
    {
      title: 'العمل الجماعي',
      titleEn: 'Teamwork',
      body: 'فريقنا هو أعظم أصولنا. معًا نشكل جزءًا من جسد المسيح، نحترم تميز كل منا، ونسعى للعيش وفق تعاليم المسيح.',
    },
    {
      title: 'الشراكة',
      titleEn: 'Partnership',
      body: 'نلتزم بالشراكة مع الكنائس المحلية والمنظمات ذات التفكير المماثل لنشر أمل ومحبة المسيح.',
    },
    {
      title: 'الإبداع',
      titleEn: 'Creativity',
      body: 'ندعم ونشجع النهج الإبداعي والمبتكر الذي يعكس قلب يسوع في الخدمة.',
    },
    {
      title: 'الرحمة',
      titleEn: 'Compassion',
      body: 'نلتزم باتباع مثال يسوع الذي تأثر بالرحمة تجاه احتياجات البشر في عالم ساقط، بمحبة ومساعدة المهمشين والمضطهدين دينيًا أو اجتماعيًا.',
    },
  ] as Tenet[],
}

/** Held back from the home carousel — they still appear on their own service
 *  page, but don't carry a full-width hero frame. */
const notInHero = new Set([
  '/archive/leaders-evangelical-council-training-2025.jpg',
  '/archive/leaders-upper-egypt-training-2025.jpg',
  '/archive/sudanese-women-discipleship-meeting.jpg',
])

/** Each section's home-eligible photos, in page order. */
const sectionPhotos: ArchivePhoto[][] = ministries
  .flatMap((m) => m.sections)
  .map((s) => (s.archive ?? []).filter((photo) => !notInHero.has(photo.src)))
  .filter((list) => list.length > 0)

/** Photos already published on the service pages, reused as the home
 *  carousel. Taken one per section per round, so the slideshow moves between
 *  ministries instead of showing every youth photo before the first Sudanese
 *  one. */
export const highlightPhotos: ArchivePhoto[] = Array.from(
  { length: Math.max(0, ...sectionPhotos.map((list) => list.length)) },
  (_, round) =>
    sectionPhotos
      .map((list) => list[round])
      .filter((photo): photo is ArchivePhoto => photo !== undefined),
)
  .flat()
  .slice(0, 6)
