import { z } from "zod";

export const formSchema = z.object({
  nome: z
    .string()
    .min(2, {
      message: "o nome deve conter no minimo 2 caracteres",
    })
    .max(40),
  email: z.string().email({
    error: "email invalido, insira um email",
  }),
  password: z.string().min(8, "a senha deve conter 8 caracteres"),
});


export const loginSchema = z.object({
  email: z.string().email({
    error: "email invalido, insira um email",
  }),
  password: z.string().min(8, "a senha deve conter 8 caracteres"),
});

export const criarCapsula = z.object({
  content: z.string().min(2, {
    message: "O conteudo da capsula deve ter no minimo 10 palavras"
  }).max(1000),
  dataEnvio: z.string().datetime({ local: true }),
  emailDestinatario: z.string().email({
    error: "digite corretamente o enderenco de email"
  })
})