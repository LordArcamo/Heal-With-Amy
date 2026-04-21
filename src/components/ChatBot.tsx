import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const FAQ: { triggers: string[]; answer: string }[] = [
  {
    triggers: ['hello', 'hi', 'hey', 'start', 'help'],
    answer: "Hello! Welcome to Energy Healing with Amy 🌿 I'm here to help answer your questions. You can ask me about services, pricing, booking, Amy's background, or locations.",
  },
  {
    triggers: ['price', 'cost', 'how much', 'pricing', 'fee', 'rate'],
    answer: "Here's a quick overview of Amy's offerings:\n\n✦ Custom Healing Session — $111 (45 min)\n✦ Alignment Path (mentorship) — $222/month\n✦ Expansion Path (mentorship) — $333/month\n\nWould you like to book a session?",
  },
  {
    triggers: ['book', 'appointment', 'schedule', 'reserve'],
    answer: "You can book a Custom Healing Session ($111 / 45 min) directly online. Visit the booking page or call Amy at 610-608-9347. Sessions are available in Easton MD, Sarasota FL, or virtually!",
  },
  {
    triggers: ['session', 'healing session', 'what happens', 'what to expect'],
    answer: "A Custom Healing Session lasts 45 minutes and is designed to support emotional release, balance, and deep relaxation. Amy uses her own hands-on healing technique — an evolution of Reiki that also incorporates astral body work.",
  },
  {
    triggers: ['reiki', 'energy healing', 'what is', 'how does it work'],
    answer: "Amy began practicing Usui Reiki in 1998 and later developed her own deeper healing technique. Her work addresses physical and emotional wellness — soothing stress, insomnia, and physical ailments by releasing energetic blockages. She also trained under renowned healer Charlie Goldsmith.",
  },
  {
    triggers: ['mentorship', 'mentor', 'program', 'alignment', 'expansion'],
    answer: "Amy offers two 1:1 mentorship paths:\n\n✦ Alignment Path ($222/mo) — one 60-min monthly session + limited check-ins\n✦ Expansion Path ($333/mo) — one 60-min session + ongoing voice/text support (24-48hr response)\n\nBoth include chakra awareness, grounding techniques, and personalized integration practices.",
  },
  {
    triggers: ['about amy', 'who is amy', 'background', 'credentials', 'experience'],
    answer: "Amy has been practicing energy healing since 1998. She studied under Charlie Goldsmith (a world-renowned healer) and developed her own hands-on technique that goes beyond traditional Reiki, including astral body work. She serves clients in Easton MD, Sarasota FL, and virtually worldwide.",
  },
  {
    triggers: ['location', 'where', 'in person', 'virtual', 'online', 'remote'],
    answer: "Amy offers sessions in two physical locations:\n\n✦ Easton, Maryland\n✦ Sarasota, Florida\n\nVirtual sessions are also available for clients anywhere in the world!",
  },
  {
    triggers: ['contact', 'phone', 'email', 'reach'],
    answer: "You can reach Amy at:\n\n📞 610-608-9347\n✉️ healwithamyo@gmail.com\n📸 @healwithamy on Instagram\n\nOr visit the Contact page to send a message directly.",
  },
  {
    triggers: ['testimonial', 'review', 'result', 'success', 'eagles', 'john bunting'],
    answer: "Former Philadelphia Eagles player John Bunting (1972–1982) shared: \"Thanks to Energy Healing with Amy, in just two sessions I have found relief. I am back on the golf course, in the gym and back in the pool doing aerobics.\"\n\nA registered nurse with 25 years experience also described it as \"one of the most cathartic and transformative experiences.\"",
  },
  {
    triggers: ['medical', 'doctor', 'health', 'diagnose', 'treatment', 'therapy'],
    answer: "Please note: Energy Healing with Amy offers spiritual and energetic services only. These services are not massage therapy, bodywork, or medical care, and do not diagnose or treat any physical or mental condition. Always consult your healthcare provider for medical concerns.",
  },
];

export function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of FAQ) {
    if (faq.triggers.some((t) => {
      const escaped = t.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      return new RegExp(`\\b${escaped}\\b`).test(lower);
    })) {
      return faq.answer;
    }
  }
  return "Thank you for your question! For the most accurate answer, please reach out to Amy directly:\n\n📞 610-608-9347\n✉️ healwithamyo@gmail.com\n\nShe'd love to hear from you 🌿";
}

export default function ChatBot() {
  const [open, setOpen]       = useState(false);
  const [messages, setMsgs]   = useState<Message[]>([
    { role: 'bot', text: "Hello! I'm Amy's assistant 🌿 How can I help you today? Ask me about sessions, pricing, or booking!" },
  ]);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  function send() {
    const text = input.trim();
    if (!text) return;

    setMsgs((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMsgs((prev) => [...prev, { role: 'bot', text: getBotResponse(text) }]);
    }, 900 + Math.random() * 400);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat with Amy\'s assistant'}
        className="chatbot-toggle"
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--brown)',
          border: '2px solid var(--gold)',
          color: 'var(--cream)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(28,24,16,0.22)',
          transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s',
          transform: open ? 'scale(1.08) rotate(15deg)' : 'scale(1)',
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      {/* Chat window */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Amy's assistant"
        className="chatbot-window"
        style={{
          background: 'var(--cream)',
          borderRadius: '16px',
          boxShadow: '0 8px 48px rgba(28,24,16,0.18), 0 0 0 1px rgba(196,151,90,0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transformOrigin: 'bottom right',
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(12px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
        }}
      >
        {/* Header */}
        <div style={{
          background: 'var(--brown)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            flexShrink: 0,
          }}>✦</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 500, color: 'var(--cream)' }}>
              Amy's Assistant
            </div>
            <div style={{ fontSize: '0.68rem', color: 'rgba(253,250,245,0.55)', letterSpacing: '0.05em' }}>
              Usually replies instantly
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          minHeight: 0,
          maxHeight: '340px',
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}>
              <div style={{
                maxWidth: '82%',
                padding: '0.65rem 1rem',
                borderRadius: msg.role === 'user'
                  ? '14px 14px 4px 14px'
                  : '4px 14px 14px 14px',
                background: msg.role === 'user' ? 'var(--brown)' : 'var(--parchment)',
                color: msg.role === 'user' ? 'var(--cream)' : 'var(--brown)',
                fontSize: '0.82rem',
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
                fontFamily: 'var(--font-body)',
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {typing && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '0.65rem 1rem',
                borderRadius: '4px 14px 14px 14px',
                background: 'var(--parchment)',
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
              }}>
                {[0, 1, 2].map((j) => (
                  <span key={j} style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--muted)',
                    display: 'inline-block',
                    animation: `chatDot 1.2s ${j * 0.2}s ease-in-out infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          borderTop: '1px solid var(--parchment)',
          padding: '0.75rem 1rem',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          background: 'var(--cream)',
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about sessions, pricing…"
            aria-label="Chat message"
            style={{
              flex: 1,
              background: 'var(--cream-dark)',
              border: '1px solid var(--parchment)',
              borderRadius: '8px',
              padding: '0.55rem 0.85rem',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--brown)',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            aria-label="Send message"
            style={{
              width: 44,
              height: 44,
              borderRadius: '8px',
              background: input.trim() ? 'var(--brown)' : 'var(--parchment)',
              border: 'none',
              cursor: input.trim() ? 'pointer' : 'default',
              color: input.trim() ? 'var(--cream)' : 'var(--muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .chatbot-toggle {
          position: fixed;
          bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
          right: 1.5rem;
          z-index: 1000;
        }
        .chatbot-window {
          position: fixed;
          bottom: calc(5.25rem + env(safe-area-inset-bottom, 0px));
          right: 1.5rem;
          z-index: 999;
          width: min(380px, calc(100vw - 3rem));
          max-height: 520px;
        }
        @media (max-width: 480px) {
          .chatbot-toggle {
            bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
            right: 1rem;
          }
          .chatbot-window {
            bottom: calc(4.75rem + env(safe-area-inset-bottom, 0px));
            right: 1rem;
            width: calc(100vw - 2rem);
            max-height: min(480px, calc(100dvh - 7rem));
          }
        }
        @keyframes chatDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
