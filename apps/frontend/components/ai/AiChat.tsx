"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Bot,
  LoaderCircle,
  MessageCircle,
  Send,
  Sparkles,
  Sprout,
  User,
  X,
} from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001";

const starterMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Здравствуйте! Я TaskAtlas AI. Расскажите, какой аграрный специалист нужен вашей организации, и я помогу структурировать потребность.",
  },
];

const quickPrompts = [
  "Нам нужны агрономы",
  "Ищем специалиста по болезням пшеницы",
  "Нужен ветеринар в сельское хозяйство",
];

export default function AiChat() {
  const [open, setOpen] =
    useState(false);

  const [messages, setMessages] =
    useState<Message[]>(
      starterMessages,
    );

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(
      null,
    );

  const messagesEndRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(
    text?: string,
  ) {
    const messageText =
      (text ?? input).trim();

    if (
      !messageText ||
      loading
    ) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: messageText,
    };

    setMessages(
      (current) => [
        ...current,
        userMessage,
      ],
    );

    setInput("");
    setError(null);
    setLoading(true);

    try {
      const response =
        await fetch(
          `${API_URL}/ai/chat`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              message: messageText,
            }),
          },
        );

      if (!response.ok) {
        const responseText =
          await response.text();

        console.error(
          "AI API error:",
          response.status,
          responseText,
        );

        throw new Error(
          "Backend returned an error",
        );
      }

      const data = (await response.json()) as {
        message?: string;
      };

      if (!data.message) {
        throw new Error(
          "AI returned an empty response",
        );
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.message,
      };

      setMessages(
        (current) => [
          ...current,
          assistantMessage,
        ],
      );
    } catch (err) {
      console.error(err);

      setError(
        "Не удалось связаться с TaskAtlas AI. Проверьте, запущен ли backend на localhost:3001.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    void sendMessage();
  }

  return (
    <>
      {/* ===================================================
          CHAT WINDOW
      =================================================== */}

      {open && (
        <div
          className="
            fixed
            bottom-24
            right-4
            z-[100]
            flex
            h-[620px]
            max-h-[calc(100vh-120px)]
            w-[calc(100vw-32px)]
            max-w-[410px]
            flex-col
            overflow-hidden
            rounded-3xl
            border
            border-violet-400/20
            bg-[#0b0815]/95
            shadow-[0_30px_120px_rgba(0,0,0,.65)]
            backdrop-blur-2xl
            sm:right-6
          "
        >
          {/* HEADER */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-violet-400/10
              bg-[#100c1d]
              px-5
              py-4
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-violet-600
                  to-purple-600
                  text-white
                  shadow-[0_0_25px_rgba(139,92,246,.25)]
                "
              >
                <Bot size={20} />
              </div>

              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    font-semibold
                    text-white
                  "
                >
                  TaskAtlas AI

                  <Sparkles
                    size={13}
                    className="text-violet-400"
                  />
                </div>

                <div
                  className="
                    mt-0.5
                    flex
                    items-center
                    gap-1.5
                    text-[11px]
                    text-[#777081]
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-400
                      shadow-[0_0_8px_rgba(52,211,153,.8)]
                    "
                  />

                  Agricultural Demand Assistant
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setOpen(false)
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-[#80788c]
                transition
                hover:bg-white/[0.05]
                hover:text-white
              "
            >
              <X size={18} />
            </button>
          </div>

          {/* AI NOTICE */}

          <div
            className="
              border-b
              border-violet-400/10
              bg-violet-500/[0.035]
              px-5
              py-3
            "
          >
            <div
              className="
                flex
                items-start
                gap-2
                text-[11px]
                leading-5
                text-[#81798d]
              "
            >
              <Sprout
                size={13}
                className="
                  mt-1
                  shrink-0
                  text-violet-400
                "
              />

              AI помогает структурировать запрос,
              но не должен придумывать
              отсутствующие факты.
            </div>
          </div>

          {/* MESSAGES */}

          <div
            className="
              flex-1
              overflow-y-auto
              px-4
              py-5
            "
          >
            <div className="space-y-4">
              {messages.map(
                (message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                  />
                ),
              )}

              {loading && (
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-violet-500/10
                      text-violet-300
                    "
                  >
                    <Bot size={15} />
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-2xl
                      rounded-tl-sm
                      border
                      border-violet-400/10
                      bg-white/[0.03]
                      px-4
                      py-3
                      text-sm
                      text-[#9991a4]
                    "
                  >
                    <LoaderCircle
                      size={14}
                      className="animate-spin"
                    />

                    AI думает...
                  </div>
                </div>
              )}

              <div
                ref={
                  messagesEndRef
                }
              />
            </div>
          </div>

          {/* QUICK PROMPTS */}

          {messages.length <= 1 && (
            <div
              className="
                border-t
                border-violet-400/10
                px-4
                py-3
              "
            >
              <div
                className="
                  mb-2
                  text-[10px]
                  uppercase
                  tracking-[0.12em]
                  text-[#676071]
                "
              >
                Попробуйте спросить
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {quickPrompts.map(
                  (prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() =>
                        void sendMessage(
                          prompt,
                        )
                      }
                      className="
                        rounded-lg
                        border
                        border-violet-400/10
                        bg-violet-500/[0.05]
                        px-2.5
                        py-1.5
                        text-[10px]
                        text-[#aaa2b5]
                        transition
                        hover:border-violet-400/25
                        hover:text-violet-200
                      "
                    >
                      {prompt}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}

          {/* ERROR */}

          {error && (
            <div
              className="
                border-t
                border-red-400/10
                bg-red-500/[0.05]
                px-4
                py-2.5
                text-xs
                leading-5
                text-red-300
              "
            >
              {error}
            </div>
          )}

          {/* INPUT */}

          <form
            onSubmit={handleSubmit}
            className="
              border-t
              border-violet-400/10
              bg-[#0d0918]
              p-4
            "
          >
            <div
              className="
                flex
                items-end
                gap-2
                rounded-2xl
                border
                border-violet-400/15
                bg-[#151124]
                p-2
                transition
                focus-within:border-violet-400/40
              "
            >
              <textarea
                value={input}
                onChange={(event) =>
                  setInput(
                    event.target.value,
                  )
                }
                onKeyDown={(
                  event,
                ) => {
                  if (
                    event.key ===
                      "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();

                    void sendMessage();
                  }
                }}
                rows={1}
                placeholder="Напишите, кого вы ищете..."
                className="
                  max-h-28
                  min-h-10
                  flex-1
                  resize-none
                  bg-transparent
                  px-2
                  py-2
                  text-sm
                  leading-5
                  text-white
                  outline-none
                  placeholder:text-[#5e5768]
                "
              />

              <button
                type="submit"
                disabled={
                  loading ||
                  !input.trim()
                }
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-violet-600
                  to-purple-600
                  text-white
                  transition
                  hover:from-violet-500
                  hover:to-purple-500
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
              >
                {loading ? (
                  <LoaderCircle
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Send size={17} />
                )}
              </button>
            </div>

            <div
              className="
                mt-2
                text-center
                text-[10px]
                text-[#5f5869]
              "
            >
              Enter — отправить · Shift + Enter —
              новая строка
            </div>
          </form>
        </div>
      )}

      {/* ===================================================
          FLOATING BUTTON
      =================================================== */}

      <button
        type="button"
        onClick={() =>
          setOpen(
            (current) =>
              !current,
          )
        }
        aria-label="Открыть TaskAtlas AI"
        className="
          fixed
          bottom-6
          right-4
          z-[100]
          flex
          h-14
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-violet-300/20
          bg-gradient-to-r
          from-violet-600
          to-purple-600
          px-4
          font-semibold
          text-white
          shadow-[0_10px_45px_rgba(139,92,246,.35)]
          transition
          hover:scale-105
          hover:from-violet-500
          hover:to-purple-500
          sm:right-6
        "
      >
        {open ? (
          <X size={20} />
        ) : (
          <>
            <MessageCircle
              size={19}
            />

            <span
              className="
                hidden
                text-sm
                sm:inline
              "
            >
              Ask TaskAtlas AI
            </span>
          </>
        )}
      </button>
    </>
  );
}

/* =========================================================
   MESSAGE
========================================================= */

function ChatMessage({
  message,
}: {
  message: Message;
}) {
  const isUser =
    message.role === "user";

  return (
    <div
      className={`
        flex
        items-start
        gap-3

        ${
          isUser
            ? "flex-row-reverse"
            : ""
        }
      `}
    >
      <div
        className={`
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg

          ${
            isUser
              ? "bg-white/[0.06] text-[#aaa2b4]"
              : "bg-violet-500/10 text-violet-300"
          }
        `}
      >
        {isUser ? (
          <User size={15} />
        ) : (
          <Bot size={15} />
        )}
      </div>

      <div
        className={`
          max-w-[82%]
          whitespace-pre-wrap
          rounded-2xl
          px-4
          py-3
          text-sm
          leading-6

          ${
            isUser
              ? "rounded-tr-sm bg-violet-600 text-white"
              : "rounded-tl-sm border border-violet-400/10 bg-white/[0.03] text-[#b4acc0]"
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
}