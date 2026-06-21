import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SEND_REQUEST_URL = 'https://functions.poehali.dev/1c58c89a-9739-4909-9e46-a7230dace9c0';

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'services', label: 'Услуги' },
  { id: 'about', label: 'О практике' },
  { id: 'consult', label: 'Консультация' },
  { id: 'contacts', label: 'Контакты' },
];

const STATS = [
  { value: '20+', label: 'лет практики' },
  { value: '1500+', label: 'выигранных дел' },
  { value: '8+', label: 'лет опыта команды' },
];

const SERVICES = [
  { icon: 'Scale', title: 'Уголовные дела', text: 'Защита на следствии и в суде, обжалование приговоров, работа с любой степенью тяжести обвинения.' },
  { icon: 'FileText', title: 'Гражданские дела', text: 'Споры по имуществу, наследству, недвижимости, взыскание долгов и защита интересов в суде.' },
  { icon: 'ShieldCheck', title: 'Защита на следствии', text: 'Сопровождение допросов, обысков и очных ставок. Контроль соблюдения ваших прав на каждом этапе.' },
  { icon: 'Users', title: 'Семейные споры', text: 'Развод, раздел имущества, определение места жительства детей, алименты и брачные договоры.' },
  { icon: 'Building2', title: 'Бизнес и арбитраж', text: 'Корпоративные споры, договорная работа, представительство в арбитражных судах.' },
  { icon: 'Gavel', title: 'Обжалование решений', text: 'Апелляция, кассация и надзор. Пересмотр дел и отмена незаконных решений.' },
];

const ADVANTAGES = [
  { icon: 'Award', title: 'Опыт и профессионализм', text: 'Более 20 лет в юриспруденции, работа в Следственном комитете — взгляд на дело с обеих сторон.' },
  { icon: 'Trophy', title: 'Более 1500 дел', text: 'Внушительное портфолио выигранных дел и довольных клиентов.' },
  { icon: 'UsersRound', title: 'Команда профессионалов', text: 'Собственный штат юристов и адвокатов с опытом более 8 лет.' },
  { icon: 'FileSignature', title: 'Гарантии по договору', text: 'Прозрачность, контроль и безопасность. Честность и конфиденциальность на всех этапах.' },
];

const SCHEDULE = [
  { day: 'Понедельник', slots: ['10:00 — очно', '14:00 — онлайн', '18:00 — онлайн'] },
  { day: 'Вторник', slots: ['11:00 — очно', '15:00 — очно', '19:00 — онлайн'] },
  { day: 'Среда', slots: ['10:00 — онлайн', '13:00 — очно', '17:00 — онлайн'] },
  { day: 'Четверг', slots: ['12:00 — очно', '16:00 — онлайн'] },
  { day: 'Пятница', slots: ['10:00 — очно', '14:00 — очно', '18:00 — онлайн'] },
  { day: 'Суббота', slots: ['11:00 — онлайн'] },
];

const LAWYER_IMG = 'https://cdn.poehali.dev/projects/1848aecc-704b-4099-9131-4f21940d231c/files/c7d2ebf0-c940-494c-804d-4089019c2274.jpg';

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitForm = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: 'Заполните поля', description: 'Укажите имя и телефон.', variant: 'destructive' });
      return;
    }
    setSending(true);
    try {
      const res = await fetch(SEND_REQUEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast({ title: 'Заявка отправлена', description: 'Елена Сергеевна свяжется с вами в ближайшее время.' });
      setForm({ name: '', phone: '', message: '' });
    } catch {
      toast({ title: 'Ошибка отправки', description: 'Попробуйте позже или позвоните нам.', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between h-20">
          <button onClick={() => scrollTo('home')} className="flex flex-col items-start leading-none">
            <span className="font-display text-2xl font-bold tracking-wide text-foreground">Мамедова<span className="text-gold"> Е.С.</span></span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">Адвокатская практика</span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('consult')} className="hidden md:inline-flex bg-gold text-primary-foreground hover:bg-gold/90 rounded-none px-6">
            Записаться
          </Button>
          <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left text-muted-foreground hover:text-gold">
                {n.label}
              </button>
            ))}
            <Button onClick={() => scrollTo('consult')} className="bg-gold text-primary-foreground rounded-none">Записаться</Button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="hero-vignette pt-20">
        <div className="container grid lg:grid-cols-2 gap-12 items-center min-h-[92vh] py-16">
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 border border-gold/40 px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-xs uppercase tracking-[0.25em] text-gold">Адвокат • Уголовные и гражданские дела</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
              Защита, основанная<br />на <span className="text-gold italic">опыте</span> и доверии
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-10">
              Мамедова Елена Сергеевна — адвокат с более чем 20-летним стажем. За плечами работа в Следственном комитете
              и свыше 1500 выигранных дел.
            </p>
            <div className="flex flex-wrap gap-4 mb-14">
              <Button onClick={() => scrollTo('consult')} className="bg-gold text-primary-foreground hover:bg-gold/90 rounded-none px-8 h-12 text-base">
                Записаться на консультацию
              </Button>
              <Button onClick={() => scrollTo('services')} variant="outline" className="border-border text-foreground hover:bg-secondary rounded-none px-8 h-12 text-base">
                Услуги
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6 max-w-lg">
              {STATS.map((s) => (
                <div key={s.label} className="border-l border-gold/40 pl-4">
                  <div className="font-display text-4xl font-bold text-gold">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="fade-up relative hidden lg:block" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-4 border border-gold/30 translate-x-6 translate-y-6" />
            <img src={LAWYER_IMG} alt="Адвокат Мамедова Елена Сергеевна" className="relative w-full h-[640px] object-cover grayscale-[15%]" />
            <div className="absolute bottom-6 left-6 right-10 bg-background/90 backdrop-blur border border-border p-5">
              <div className="font-display text-xl font-semibold">Мамедова Елена Сергеевна</div>
              <div className="text-sm text-muted-foreground">Адвокат • защита ваших интересов</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 border-t border-border">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Направления работы</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Юридические услуги</h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Полное сопровождение — от первой консультации до окончательного решения вашего вопроса.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {SERVICES.map((s) => (
              <div key={s.title} className="group bg-card p-8 hover:bg-secondary transition-colors">
                <div className="w-12 h-12 flex items-center justify-center border border-gold/40 text-gold mb-6 group-hover:bg-gold group-hover:text-primary-foreground transition-colors">
                  <Icon name={s.icon} size={22} />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 border-t border-border bg-card/40">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold">О практике</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">Почему выбирают именно нас</h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Работа ведётся исключительно по договору — это обеспечивает прозрачность, контроль и безопасность.
              Мы гарантируем индивидуальный подход, честность и конфиденциальность на всех этапах.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              {ADVANTAGES.map((a) => (
                <div key={a.title}>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name={a.icon} size={22} className="text-gold" />
                    <h3 className="font-display text-xl font-semibold">{a.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="border border-gold/30 p-10">
              <Icon name="Quote" size={40} className="text-gold mb-6" />
              <p className="font-display text-2xl md:text-3xl leading-snug italic mb-8">
                «Каждое дело — это судьба человека. Моя задача — защитить ваши интересы максимально качественно и быстро».
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-gold" />
                <div>
                  <div className="font-semibold">Мамедова Елена Сергеевна</div>
                  <div className="text-sm text-muted-foreground">Адвокат, более 20 лет практики</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation / Schedule */}
      <section id="consult" className="py-24 border-t border-border">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Расписание</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Доступность для консультаций</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Выберите удобное время для очной или онлайн-встречи. Подтверждение записи — после короткого звонка.
            </p>
          </div>

          <div className="flex justify-center gap-6 mb-10 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground"><span className="w-2.5 h-2.5 bg-gold" />Очно</span>
            <span className="flex items-center gap-2 text-muted-foreground"><span className="w-2.5 h-2.5 border border-gold" />Онлайн</span>
          </div>

          <div className="grid lg:grid-cols-[260px_1fr] gap-px bg-border border border-border max-w-4xl mx-auto">
            <div className="bg-card flex lg:flex-col">
              {SCHEDULE.map((d, i) => (
                <button
                  key={d.day}
                  onClick={() => setActiveDay(i)}
                  className={`flex-1 text-left px-6 py-4 border-b border-border transition-colors ${activeDay === i ? 'bg-gold text-primary-foreground' : 'hover:bg-secondary'}`}
                >
                  <span className="hidden lg:inline font-display text-lg font-semibold">{d.day}</span>
                  <span className="lg:hidden font-display text-base font-semibold">{d.day.slice(0, 2)}</span>
                </button>
              ))}
            </div>
            <div className="bg-card p-8">
              <h3 className="font-display text-2xl font-semibold mb-6">{SCHEDULE[activeDay].day}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {SCHEDULE[activeDay].slots.map((slot) => {
                  const online = slot.includes('онлайн');
                  return (
                    <button
                      key={slot}
                      onClick={() => scrollTo('contacts')}
                      className="flex items-center justify-between border border-border px-5 py-4 hover:border-gold transition-colors group"
                    >
                      <span className="flex items-center gap-3">
                        <Icon name={online ? 'Video' : 'MapPin'} size={18} className="text-gold" />
                        <span className="font-medium">{slot}</span>
                      </span>
                      <Icon name="ChevronRight" size={18} className="text-muted-foreground group-hover:text-gold transition-colors" />
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-muted-foreground mt-8 flex items-center gap-2">
                <Icon name="Info" size={16} className="text-gold" />
                Первичная консультация помогает оценить перспективы вашего дела.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-24 border-t border-border bg-card/40">
        <div className="container grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Контакты</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-8">Свяжитесь с адвокатом</h2>
            <div className="space-y-6">
              {[
                { icon: 'Phone', label: 'Телефон', value: '+7 (999) 883-52-03', href: 'tel:+79998835203' },
                { icon: 'Mail', label: 'Email', value: 'mamedowa789@gmail.com', href: 'mailto:mamedowa789@gmail.com' },
                { icon: 'MapPin', label: 'Офис', value: 'г. Киров, ул. Спасская, д. 43/1, каб. 116', href: null },
                { icon: 'Clock', label: 'Часы приёма', value: 'Пн–Пт, 09:00 — 19:00', href: null },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-5">
                  <div className="w-12 h-12 flex items-center justify-center border border-gold/40 text-gold shrink-0">
                    <Icon name={c.icon} size={20} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="font-medium text-lg hover:text-gold transition-colors">{c.value}</a>
                    ) : (
                      <div className="font-medium text-lg">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <a href="https://wa.me/79998835203" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-border px-5 py-3 hover:border-gold hover:text-gold transition-colors flex-1 justify-center">
                <Icon name="MessageCircle" size={20} />
                <span className="font-medium">WhatsApp</span>
              </a>
              <a href="https://t.me/+79998835203" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-border px-5 py-3 hover:border-gold hover:text-gold transition-colors flex-1 justify-center">
                <Icon name="Send" size={20} />
                <span className="font-medium">Telegram</span>
              </a>
            </div>
          </div>
          <div className="border border-border bg-card p-8">
            <h3 className="font-display text-2xl font-semibold mb-6">Оставить заявку</h3>
            <div className="space-y-4">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-gold transition-colors" />
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Телефон" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-gold transition-colors" />
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Кратко опишите ситуацию" rows={4} className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-gold transition-colors resize-none" />
              <Button onClick={submitForm} disabled={sending} className="w-full bg-gold text-primary-foreground hover:bg-gold/90 rounded-none h-12 text-base">
                {sending ? 'Отправляем...' : 'Отправить заявку'}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl font-bold">Мамедова<span className="text-gold"> Е.С.</span></div>
          <p className="text-sm text-muted-foreground">© 2026 Адвокатская практика. Конфиденциальность гарантирована.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;