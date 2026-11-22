// ---------------------------------------------------------------------------
// New Hope (أمل جديد) — real ministry content.
// Sources (client-supplied):
//   • "New Hope Website Data.docx"
//   • "نبذة عن خدمة تدريب القسس وقادة الشباب السودانيين.docx"
//   • the client's "من نحن" document (everything under `about`)
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

/** A named value — Arabic name, its English counterpart, and the statement
 *  that defines it. */
export interface Tenet {
  title: string
  titleEn?: string
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
  /** A closing line after the detail block. */
  closing?: string
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
  /** Small key/value chips under the section heading, as the programs carry
   *  (المدة، الفئة …). For facts too short to earn a band of their own. */
  meta?: { label: string; value: string }[]
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
        'تلمذة الشباب الجامعي من سن (١٨–٢٥) وتقديم الرعاية الشخصية وأساسيات الإيمان المسيحي والتشكيل الروحي، حتى يكون لدى الشباب على الأقل خطوة أولى في العلاقة الشخصية مع الله، وأن يكونوا مؤثرين كخدام وقادة في المجتمع والكنيسة.',
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
                  'إعداد خدام يعيشون نموذج المسيح في القيادة والخدمة والتلمذة، وتمكينهم من تلبية احتياجات الكنيسة بشكل مثمر وفعّال.',
                  'تقديم تدريبات عملية على الخدمة والتخطيط والرعاية الكنسية، بما يسهم في تطوير الخدمة داخل الكنيسة.',
                ],
              },
            },
            {
              title: 'دبلومة تدريب وتطوير القادة والخدام أونلاين',
              paragraphs: [
                'الدبلومة مكثّفة، ١٢ لقاء زووم أسبوعي و١٢ مادة أونلاين مسجَّلة على المنصة التعليمية الخاصة بالمؤسسة، بالإضافة إلى أسبوع ختام وتقديم المشروع النهائي.',
              ],
              details: {
                heading: 'هدف الدبلومة',
                items: [
                  'إعداد خادم مؤهل روحيًا ولاهوتيًا ونفسيًا ومهاريًا للخدمة في كنيسته المحلية، وذلك من خلال حضور مؤتمرات وتدريبات ولقاءات زووم، وحضور مواد أونلاين، وعمل مشروع تخرّج يحوي خطة يمكن تنفيذها في الكنائس المحلية.',
                ],
              },
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
      heading: 'خدمة الطفل — مركز نيولايف',
      tabLabel: 'الطفل',
      intro: [
        'نحن نخدم الأطفال المسيحيين السودانيين اللاجئين في مصر، في منطقة عين شمس ومنطقة الورشة بمدينة نصر.',
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
        label: 'الخدمات الأخرى المقدَّمة',
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
      meta: [
        { label: 'السيدات', value: 'من ٢٥ إلى ٤٥ سنة' },
        { label: 'البنات', value: 'من ١٨ إلى ٢٨ سنة' },
      ],
      intro: [
        'كانت البداية في سبتمبر ٢٠٢٣ بمجموعات الادّخار للسيدات السودانيات القادمات إلى القاهرة بعد أحداث أبريل ٢٠٢٣، بهدف تمكين السيدة السودانية المعيلة لأسرتها لتستطيع أن تعيش هي وأسرتها حياة متزنة ماديًا؛ وذلك بتوفير جزء من دخلها أسبوعيًا لتستلم المبلغ بعد سنة فتتمكن من عمل مشروع يكون مصدر دخل، مع إمكانية الاقتراض بعد ٦ أشهر من بداية الادّخار لعمل مشروع لزيادة الدخل أيضًا.',
        'ومع الوقت بدأت الخدمة تفكّر في أن هذه المساحة الآمنة يمكن من خلالها خدمة السيدات روحيًا عبر لقاء أسبوعي، فبدأت التلمذة بحفظ آية أسبوعيًا، ثم درس تلمذة روحي أسبوعي للمجموعات.',
      ],
      stats: [
        { value: '١٢', label: 'مجموعة تلمذة وادّخار' },
        { value: '٧', label: 'منسقات سودانيات' },
        { value: '١٨–٣٠', label: 'سيدة في كل مجموعة' },
        { value: 'ساعتان', label: 'أسبوعيًا لكل مجموعة' },
      ],
      vision:
        'أن تتمتع السيدة السودانية المعيلة لأسرتها بحياة كريمة وسويّة روحيًا ونفسيًا وماديًا، لمجابهة الحياة مع أفراد أسرتها.',
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
      meta: [
        { label: 'الفئة', value: 'من ٢٠ إلى ٤٥ سنة' },
        { label: '', value: 'قادة وخدام الشباب' },
        { label: '', value: 'القسوس والقادة الشباب في الكنائس' },
      ],
      intro: [
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
// من نحن — the organisation's own statement of itself, in the order the
// client's "من نحن" document sets it out: who we are, vision, mission, the
// three pillars, the seven values, leadership, geographic reach, and the
// services. Client-supplied and reproduced verbatim; nothing is paraphrased.
// ---------------------------------------------------------------------------

/** One service as the من نحن document describes it: what it is for, the
 *  areas it works in (a titled entry where the document names one, plain
 *  otherwise), and a closing line. */
export interface AboutService {
  title: string
  paragraphs: string[]
  areas?: { title?: string; body: string }[]
  closing?: string
}

export const about = {
  intro: [
    'خدمة أمل جديد (New Hope) هي خدمة إنجيلية تابعة لرابطة الإنجيليين بمصر (The\u00a0Evangelical\u00a0Fellowship\u00a0of\u00a0Egypt)، وتعمل في إطار العمل الإنجيلي المنظم لخدمة الكنيسة والمجتمع.',
    'تأسست خدمة أمل جديد عام 2016، انطلاقًا من إيمانها بأن رسالة المسيح تشمل الإنسان بكل جوانب حياته؛ الروحية والإنسانية والاجتماعية. وتسعى الخدمة إلى مشاركة محبة المسيح ورجائه، ومرافقة الأفراد في مسيرة النمو والتلمذة، ومساندة الكنائس المحلية لتكون أكثر قدرة على خدمة مجتمعاتها والاستجابة لاحتياجاتها.',
    'وتعمل الخدمة من خلال مجموعة من البرامج والمبادرات التي تجمع بين الكرازة والتلمذة وتمكين الكنائس، مع الاهتمام بالاحتياجات الفعلية للأفراد والأسر والمجتمعات المحلية.',
  ],
  vision:
    'أن نمجّد الله من خلال أن يرى الناس محبة المسيح ورجاءه، وأن ينمو الأفراد في معرفته واتباعه، وتكون الكنائس المحلية أكثر فاعلية في أداء دعوتها وخدمة مجتمعاتها.',
  mission: [
    'نلتزم في New Hope بمشاركة رسالة محبة المسيح ورجائه، ومرافقة الأفراد في مسيرة تلمذة ونمو روحي، وتمكين الكنائس المحلية من خلال الشراكة معها وبناء قدرات قادتها وخدامها وخدماتها.',
    'ونحرص على تقديم خدمة متكاملة تراعي السياقات الثقافية والاجتماعية، وتستجيب لاحتياجات الأفراد والأسر والمجتمعات، من خلال برامج وأنشطة متنوعة تتناسب مع طبيعة كل احتياج.',
  ],
  pillars: [
    {
      title: 'الكرازة',
      body: 'مشاركة رسالة محبة المسيح وخلاصه، وإتاحة الفرصة أمام الناس للتعرف عليه والاستجابة لدعوته، من خلال أساليب تراعي السياقات الثقافية والاجتماعية وخصوصية الأفراد والمجتمعات.',
    },
    {
      title: 'التلمذة',
      body: 'مرافقة الأفراد في مسيرة مستمرة من النمو في الإيمان واتباع المسيح، من خلال التعليم الكتابي والتشكيل الروحي والرعاية، بما يساعدهم على أن تنعكس مبادئ الإيمان المسيحي على حياتهم وعلاقاتهم وممارستهم للخدمة.',
    },
    {
      title: 'تمكين الكنائس',
      body: 'العمل بالشراكة مع الكنائس المحلية لمساندتها في القيام بدورها الروحي والمجتمعي، من خلال بناء قدرات القادة والخدام والفرق، وتطوير الخدمات، وتشجيع المبادرات التي تعبّر عمليًا عن محبة المسيح وتستجيب لاحتياجات المجتمع.',
    },
  ] as Tenet[],
  values: [
    {
      title: 'النزاهة',
      titleEn: 'Integrity',
      body: 'نلتزم بالشفافية والأمانة في خدمتنا وعلاقاتنا واستخدام وقتنا ومواردنا، واضعين أنفسنا دائمًا أمام مسؤوليتنا تجاه الله والآخرين.',
    },
    {
      title: 'المسؤولية',
      titleEn: 'Accountability',
      body: 'نؤمن بأهمية تحمل المسؤولية والمساءلة المتبادلة بالمحبة، والعمل وفق أهداف واضحة نسعى معًا لتحقيقها.',
    },
    {
      title: 'القيادة الخادمة',
      titleEn: 'Servant Leadership',
      body: 'نؤمن بقيادة تتبع مثال المسيح في المحبة والتواضع، وتلتزم بدعم الآخرين وتوجيههم وخدمتهم بأمانة وانضباط.',
    },
    {
      title: 'العمل الجماعي',
      titleEn: 'Teamwork',
      body: 'نؤمن بأن العمل الجماعي أساس نجاح الخدمة، ونقدّر مواهب وإمكانات كل فرد، ونسعى إلى التعاون والاحترام المتبادل لتحقيق أهدافنا المشتركة.',
    },
    {
      title: 'الشراكة',
      titleEn: 'Partnership',
      body: 'نؤمن بأهمية الشراكة مع الكنائس المحلية والمؤسسات ذات الأهداف المشتركة، وتبادل الخبرات والإمكانات لتحقيق أثر أعمق وأكثر استدامة.',
    },
    {
      title: 'الإبداع',
      titleEn: 'Creativity',
      body: 'نشجع التفكير الإبداعي وتطوير أساليب العمل، والبحث عن طرق مبتكرة وملائمة لتقديم الخدمة والاستجابة للاحتياجات المتغيرة.',
    },
    {
      title: 'الرحمة',
      titleEn: 'Compassion',
      body: 'نتبع مثال المسيح في الاهتمام بالإنسان، والاستجابة باهتمام ومحبة لاحتياجات الفئات الأكثر احتياجًا وتهميشًا، دون تمييز.',
    },
  ] as Tenet[],
  leadership: {
    intro:
      'تعمل خدمة أمل جديد من خلال هيكل إداري وتنظيمي يضم قيادة الخدمة ومسؤولي الخدمات المختلفة، بما يدعم تنسيق العمل والإشراف على البرامج والأنشطة ومتابعة تنفيذها.',
    leadIn: 'ويتولى قيادة خدمة أمل جديد:',
    leaders: [{ name: 'أ. ماجد نادي', role: 'قائد خدمة أمل جديد' }] as Servant[],
    closing:
      'وتعمل الخدمات المختلفة بالتعاون مع الكنائس والشركاء المحليين، وفقًا لطبيعة كل خدمة واحتياجاتها.',
  },
  reach: {
    intro:
      'تعمل خدمة أمل جديد من خلال برامجها ومبادراتها في عدد من محافظات جمهورية مصر العربية، وتشمل:',
    governorates: ['القاهرة', 'بني سويف', 'المنيا', 'أسيوط', 'سوهاج', 'قنا', 'الأقصر'],
    closing:
      'وتُنفذ الأنشطة بالتعاون مع الكنائس والشركاء المحليين، وفقًا لطبيعة كل خدمة واحتياجات المجتمعات التي تعمل بها.',
  },
  servicesLead:
    'تعمل New Hope من خلال مجموعة من الخدمات والبرامج التي تتكامل فيما بينها، وتستجيب للاحتياجات الروحية والإنسانية والتعليمية والاجتماعية للأفراد والأسر والمجتمعات.',
  services: [
    {
      title: 'خدمة الرحمة والسيدات',
      paragraphs: [
        'تهدف الخدمة إلى التعبير عن محبة المسيح بصورة عملية، من خلال مساندة الأسر الأكثر احتياجًا، مع اهتمام خاص بالنساء اللاتي يتحملن مسؤولية إعالة أسرهن، ومساعدتهن على تحسين ظروفهن المعيشية وتعزيز قدرتهن على الاعتماد على الذات.',
      ],
      areas: [
        { title: 'المساعدات الغذائية والإنسانية', body: 'تقديم الدعم للأسر الأكثر احتياجًا لتلبية احتياجاتها الأساسية.' },
        { title: 'تحسين ظروف السكن', body: 'المساهمة في ترميم المنازل وتحسين المرافق الأساسية، مثل الأسقف ودورات المياه وتوصيل المياه.' },
        { title: 'المشروعات الصغيرة المدرة للدخل', body: 'مساعدة بعض السيدات على بدء مشروعات مناسبة لقدراتهن واحتياجات أسرهن، مع المتابعة والتوجيه.' },
        { title: 'مجموعات الدعم والتلمذة', body: 'توفير مساحات للمشاركة والمساندة والنمو الروحي، تساعد السيدات على مشاركة خبراتهن ودراسة كلمة الله.' },
        { title: 'الدعم التعليمي', body: 'مساندة الطلاب المتفوقين من أبناء الأسر المستفيدة، بما يساعدهم على استكمال تعليمهم.' },
      ],
      closing:
        'وتحرص الخدمة على التعاون مع الكنائس والشركاء المحليين للوصول إلى الأسر الأكثر احتياجًا وتوجيه المساعدات وفقًا للاحتياجات الفعلية.',
    },
    {
      title: 'برنامج دعم الأطفال اللاجئين السودانيين في مصر',
      paragraphs: [
        'استجابة للاحتياجات التعليمية والإنسانية التي تواجه بعض الأسر السودانية اللاجئة في مصر، تقدم الخدمة دعمًا للأطفال من خلال برامج تعليمية في مراكز مجتمعية.',
        'ويهدف البرنامج إلى إتاحة فرص للتعلم والنمو للأطفال، ومساندتهم في مواجهة التحديات المرتبطة بظروف اللجوء وصعوبة الالتحاق بالتعليم.',
        'ويشمل العمل تقديم أنشطة تعليمية مناسبة للأطفال، والاستعانة بمعلمين مؤهلين، وتوفير بيئة تعليمية داعمة تراعي احتياجاتهم وظروفهم.',
      ],
    },
    {
      title: 'خدمة التلمذة والقيادة',
      paragraphs: [
        'تعمل الخدمة على مساندة الشباب في النمو في إيمانهم ومعرفتهم الكتابية، وإعداد خدام وقادة أكثر نضجًا وكفاءة، قادرين على خدمة الكنيسة والمجتمع.',
      ],
      areas: [
        { title: 'تلمذة الشباب', body: 'مساعدة الشباب، خاصة طلاب الجامعات والخريجين الجدد، على تعميق معرفتهم بالكتاب المقدس والإيمان المسيحي، والنمو في علاقتهم بالله واكتشاف دعوتهم ودورهم.' },
        { title: 'إعداد الخدام والقادة', body: 'تقديم برامج تعليمية وتدريبية تساعد الخدام والقادة على تطوير معارفهم الكتابية واللاهوتية ومهاراتهم الشخصية والخدمية والقيادية.' },
        { title: 'التدريب وبناء القدرات', body: 'مساندة الكنائس وخدامها من خلال لقاءات ومؤتمرات وبرامج تدريبية تتناسب مع احتياجاتهم.' },
      ],
    },
    {
      title: 'خدمة النشر',
      paragraphs: [
        'تهتم خدمة النشر بإعداد وتوفير مواد كتابية وتعليمية تساعد الأفراد، خاصة الأطفال والشباب، على فهم كلمة الله والتفاعل معها بصورة واضحة ومناسبة.',
      ],
      areas: [
        { body: 'إعداد ونشر قصص ومواد كتابية مبسطة.' },
        { body: 'تطوير مواد تعليمية تناسب المراحل العمرية المختلفة.' },
        { body: 'إنتاج مواد صوتية مساندة للمواد المنشورة.' },
        { body: 'التعاون مع الكنائس والشركاء في إتاحة هذه المواد والاستفادة منها في التعليم والتلمذة.' },
      ],
      closing:
        'وتسعى الخدمة إلى تقديم محتوى واضح ومناسب يساعد على تقريب المعاني الكتابية وتعزيز أثرها في الحياة اليومية.',
    },
    {
      title: 'خدمة الأونلاين',
      paragraphs: [
        'تسعى New Hope إلى الاستفادة من الإمكانات التعليمية المتاحة عبر الوسائل الرقمية، من خلال توفير محتوى وموارد تعليمية تساعد الأفراد على النمو الروحي والكتابي، والتعمق في فهم الإيمان المسيحي ومبادئ الحياة والخدمة.',
        'وتأتي هذه الجهود امتدادًا لاهتمام الخدمة بالتلمذة وإعداد الخدام والقادة، وإتاحة فرص متنوعة للتعلم والنمو بما يتناسب مع احتياجات الأفراد.',
      ],
    },
  ] as AboutService[],
}

/** One piece of the من نحن banner: a ministry's photo, with the ministry it
 *  belongs to for the banner's accessible name. */
export interface PuzzlePieceContent {
  label: string
  /** Path under `public/archive/`. */
  src: string
}

/** The من نحن banner: the ministries as the pieces of one puzzle, in the
 *  order they are read (right to left, top row first). Fifteen pieces from
 *  five ministries: every archive photo once, then four of them again — one
 *  per ministry that has fewer shots than the children's — each repeat in
 *  the corner opposite its first showing. The desktop grid is 5 × 3 and
 *  takes all fifteen; the phone grid is 2 × 4 and takes the first eight —
 *  the order keeps ministries apart in both, so no piece sits beside or
 *  directly above another of its own ministry. */
export const servicePuzzle: PuzzlePieceContent[] = [
  { label: 'خدمة الشباب', src: '/archive/youth-discipleship-school-group.jpg' },
  { label: 'تدريب القادة', src: '/archive/leaders-upper-egypt-training-2025.jpg' },
  { label: 'خدمة الطفل', src: '/archive/sudanese-children-teacher-in-class.jpg' },
  { label: 'الفتيات والسيدات', src: '/archive/sudanese-women-discipleship-event.jpg' },
  { label: 'القسس وقادة الشباب', src: '/archive/sudanese-pastors-leadership-conference.jpg' },
  { label: 'خدمة الطفل', src: '/archive/sudanese-children-students-in-class.jpg' },
  { label: 'خدمة الشباب', src: '/archive/youth-discipleship-school-lecture.jpg' },
  { label: 'تدريب القادة', src: '/archive/leaders-evangelical-council-training-2025.jpg' },
  { label: 'خدمة الطفل', src: '/archive/sudanese-children-mathematics-class.jpg' },
  { label: 'الفتيات والسيدات', src: '/archive/sudanese-women-discipleship-meeting.jpg' },
  { label: 'القسس وقادة الشباب', src: '/archive/sudanese-pastors-leadership-conference.jpg' },
  { label: 'الفتيات والسيدات', src: '/archive/sudanese-women-discipleship-event.jpg' },
  { label: 'خدمة الطفل', src: '/archive/sudanese-children-counting-technique.jpg' },
  { label: 'تدريب القادة', src: '/archive/leaders-upper-egypt-training-2025.jpg' },
  { label: 'خدمة الشباب', src: '/archive/youth-discipleship-school-group.jpg' },
]

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
