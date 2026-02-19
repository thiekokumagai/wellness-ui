export interface Professional {
  id: string;
  name: string;
  profession: "Personal Trainer" | "Nutricionista";
  photo: string;
  city: string;
  pricePerHour: number;
  rating: number;
  reviews: number;
  online: boolean;
  presencial: boolean;
  specialties: string[];
  about: string;
  certifications: string[];
  benefits: string[];
  locations: string[];
  videoUrl?: string;
}

export interface Student {
  id: string;
  name: string;
  objective: string;
  activePlan: string;
  nextAppointment: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isMine: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  photo: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  status: "confirmado" | "pendente" | "cancelado";
  professional?: string;
  student?: string;
}

export const professionals: Professional[] = [
  {
    id: "1",
    name: "Ana Martins",
    profession: "Personal Trainer",
    photo: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face",
    city: "São Paulo",
    pricePerHour: 120,
    rating: 4.9,
    reviews: 87,
    online: true,
    presencial: true,
    specialties: ["Musculação", "HIIT", "Funcional"],
    about: "Personal trainer certificada com 8 anos de experiência. Especializada em transformação corporal e performance atlética. Minha abordagem combina ciência do exercício com motivação personalizada.",
    certifications: ["CREF 12345-G/SP", "Certificação CrossFit L2", "Especialização em Biomecânica"],
    benefits: ["Avaliação física completa", "Plano personalizado", "Acompanhamento por app", "Suporte via chat"],
    locations: ["Studio Fitness Vila Madalena", "Parque Ibirapuera", "Online"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "2",
    name: "Dr. Carlos Silva",
    profession: "Nutricionista",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    city: "Rio de Janeiro",
    pricePerHour: 180,
    rating: 4.8,
    reviews: 124,
    online: true,
    presencial: true,
    specialties: ["Nutrição Esportiva", "Emagrecimento", "Nutrição Clínica"],
    about: "Nutricionista com mestrado em Nutrição Esportiva pela USP. Atendo atletas profissionais e amadores com foco em performance e saúde.",
    certifications: ["CRN 54321", "Mestrado Nutrição Esportiva USP", "Pós-graduação Nutrição Funcional"],
    benefits: ["Plano alimentar personalizado", "Bioimpedância", "Acompanhamento semanal", "Receitas exclusivas"],
    locations: ["Clínica Nutri Barra", "Online"],
  },
  {
    id: "3",
    name: "Fernanda Costa",
    profession: "Personal Trainer",
    photo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop&crop=face",
    city: "Curitiba",
    pricePerHour: 100,
    rating: 4.7,
    reviews: 56,
    online: true,
    presencial: false,
    specialties: ["Yoga", "Pilates", "Alongamento"],
    about: "Instrutora de yoga e pilates com certificação internacional. Foco em bem-estar, flexibilidade e saúde mental.",
    certifications: ["CREF 67890-G/PR", "RYT 500 Yoga Alliance", "Certificação Pilates BASI"],
    benefits: ["Aulas ao vivo", "Gravações disponíveis", "Meditação guiada", "Plano mensal"],
    locations: ["Online"],
  },
  {
    id: "4",
    name: "Dr. Marina Souza",
    profession: "Nutricionista",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    city: "São Paulo",
    pricePerHour: 150,
    rating: 4.9,
    reviews: 203,
    online: true,
    presencial: true,
    specialties: ["Nutrição Vegana", "Intolerâncias", "Reeducação Alimentar"],
    about: "Especialista em nutrição baseada em plantas e intolerâncias alimentares. Acredito que alimentação saudável pode ser deliciosa e acessível.",
    certifications: ["CRN 11111", "Especialização em Nutrição Vegana", "Certificação em Coaching Nutricional"],
    benefits: ["Cardápio semanal", "Lista de compras", "Suporte diário", "Workshop mensal"],
    locations: ["Consultório Jardins", "Online"],
  },
  {
    id: "5",
    name: "Ricardo Oliveira",
    profession: "Personal Trainer",
    photo: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop&crop=face",
    city: "Belo Horizonte",
    pricePerHour: 90,
    rating: 4.6,
    reviews: 42,
    online: false,
    presencial: true,
    specialties: ["Crossfit", "Força", "Condicionamento"],
    about: "Coach de CrossFit e treinamento de força. Ajudo pessoas a superarem seus limites com segurança e eficiência.",
    certifications: ["CREF 22222-G/MG", "CrossFit L3", "Especialização em Força e Condicionamento"],
    benefits: ["Treino em grupo", "Avaliação mensal", "Nutrição básica inclusa", "Comunidade ativa"],
    locations: ["Box CrossFit BH", "Academia Power Fit"],
  },
  {
    id: "6",
    name: "Dra. Julia Mendes",
    profession: "Nutricionista",
    photo: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?w=400&h=400&fit=crop&crop=face",
    city: "Porto Alegre",
    pricePerHour: 140,
    rating: 4.8,
    reviews: 91,
    online: true,
    presencial: true,
    specialties: ["Nutrição Infantil", "Gestantes", "Nutrição Familiar"],
    about: "Nutricionista especializada em saúde da mulher e nutrição infantil. Trabalho com famílias para criar hábitos alimentares saudáveis.",
    certifications: ["CRN 33333", "Pós em Nutrição Materno-Infantil", "Certificação em Nutrição Pediátrica"],
    benefits: ["Atendimento familiar", "Plano alimentar por fase", "Receitas para crianças", "Grupo de mães"],
    locations: ["Clínica Vida Saudável", "Online"],
  },
];

export const mockStudents: Student[] = [
  { id: "1", name: "João Pedro", objective: "Emagrecimento", activePlan: "Plano Fit 30 dias", nextAppointment: "15/02/2026 - 10:00" },
  { id: "2", name: "Maria Clara", objective: "Ganho de massa", activePlan: "Plano Hipertrofia", nextAppointment: "16/02/2026 - 14:00" },
  { id: "3", name: "Lucas Santos", objective: "Condicionamento", activePlan: "Plano Funcional", nextAppointment: "17/02/2026 - 08:00" },
  { id: "4", name: "Beatriz Lima", objective: "Flexibilidade", activePlan: "Plano Yoga", nextAppointment: "18/02/2026 - 16:00" },
];

export const mockConversations: Conversation[] = [
  { id: "1", name: "Ana Martins", photo: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=80&h=80&fit=crop&crop=face", lastMessage: "Oi! Seu plano de treino está pronto!", time: "10:30", unread: 2 },
  { id: "2", name: "Dr. Carlos Silva", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face", lastMessage: "Vamos ajustar seu plano alimentar", time: "Ontem", unread: 0 },
  { id: "3", name: "Fernanda Costa", photo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&h=80&fit=crop&crop=face", lastMessage: "Aula de yoga amanhã às 7h!", time: "Seg", unread: 1 },
];

export const mockMessages: Message[] = [
  { id: "1", senderId: "pro1", text: "Olá! Tudo bem? Vi que você se interessou pelo meu plano de treino.", time: "10:00", isMine: false },
  { id: "2", senderId: "me", text: "Oi Ana! Sim, gostaria de saber mais sobre o plano de musculação.", time: "10:05", isMine: true },
  { id: "3", senderId: "pro1", text: "Claro! O plano inclui 4 treinos por semana, com foco em hipertrofia. Posso montar algo personalizado para seus objetivos.", time: "10:08", isMine: false },
  { id: "4", senderId: "me", text: "Perfeito! Quero focar em ganho de massa muscular. Quando podemos começar?", time: "10:15", isMine: true },
  { id: "5", senderId: "pro1", text: "Podemos começar na próxima segunda! Vou preparar tudo e te enviar o plano até sexta. 💪", time: "10:20", isMine: false },
  { id: "6", senderId: "pro1", text: "Oi! Seu plano de treino está pronto! Dá uma olhada e me diz o que acha.", time: "10:30", isMine: false },
];

export const mockAppointments: Appointment[] = [
  { id: "1", title: "Treino com Ana Martins", date: "2026-02-15", time: "10:00", status: "confirmado", professional: "Ana Martins" },
  { id: "2", title: "Consulta Dr. Carlos", date: "2026-02-16", time: "14:00", status: "pendente", professional: "Dr. Carlos Silva" },
  { id: "3", title: "Yoga com Fernanda", date: "2026-02-17", time: "07:00", status: "confirmado", professional: "Fernanda Costa" },
  { id: "4", title: "Treino com Ana Martins", date: "2026-02-19", time: "10:00", status: "confirmado", professional: "Ana Martins" },
  { id: "5", title: "Reavaliação Nutricional", date: "2026-02-20", time: "15:00", status: "pendente", professional: "Dr. Carlos Silva" },
  { id: "6", title: "Treino João Pedro", date: "2026-02-15", time: "10:00", status: "confirmado", student: "João Pedro" },
  { id: "7", title: "Treino Maria Clara", date: "2026-02-16", time: "14:00", status: "pendente", student: "Maria Clara" },
  { id: "8", title: "Avaliação Lucas", date: "2026-02-18", time: "08:00", status: "confirmado", student: "Lucas Santos" },
];

export const testimonials = [
  { name: "Camila Ferreira", text: "Encontrei a personal perfeita para mim! Em 3 meses já vi resultados incríveis.", role: "Aluna", rating: 5 },
  { name: "Pedro Almeida", text: "O nutricionista me ajudou a criar um plano alimentar que realmente funciona no meu dia a dia.", role: "Aluno", rating: 5 },
  { name: "Larissa Gomes", text: "Plataforma incrível! Fácil de usar e os profissionais são muito qualificados.", role: "Aluna", rating: 5 },
];