import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.achievement.createMany({
    data: [
      // TRAINING_COMPLETED (Treinos Concluídos)
      {
        type: 'TRAINING_COMPLETED',
        goal: 1,
        name: 'Iniciante',
        description:
          'Você completou seu primeiro treino! O começo de uma grande jornada.',
      },
      {
        type: 'TRAINING_COMPLETED',
        goal: 10,
        name: 'Disciplina em Ação',
        description: '10 treinos concluídos! O progresso está visível.',
      },
      {
        type: 'TRAINING_COMPLETED',
        goal: 30,
        name: 'Atleta Dedicado',
        description: '30 treinos no currículo! Seu comprometimento é exemplar.',
      },
      {
        type: 'TRAINING_COMPLETED',
        goal: 50,
        name: 'Máquina de Treino',
        description: '50 treinos finalizados! Você está no caminho certo.',
      },
      {
        type: 'TRAINING_COMPLETED',
        goal: 100,
        name: 'Imparável',
        description:
          '100 treinos concluídos! Uma verdadeira lenda na academia.',
      },

      // STREAK_DAYS (Dias Consecutivos de Treino)
      {
        type: 'STREAK_DAYS',
        goal: 3,
        name: 'Firme e Forte',
        description: 'Treinou 3 dias seguidos! O hábito está se formando.',
      },
      {
        type: 'STREAK_DAYS',
        goal: 7,
        name: 'Rotina de Campeão',
        description: '7 dias consecutivos de treino! Disciplina é tudo.',
      },
      {
        type: 'STREAK_DAYS',
        goal: 14,
        name: 'Constância Vencedora',
        description: '14 dias sem falhar! Resultados estão aparecendo.',
      },
      {
        type: 'STREAK_DAYS',
        goal: 30,
        name: 'Inquebrável',
        description: '30 dias seguidos treinando! Um verdadeiro guerreiro.',
      },

      // WEIGHT_LIFTED (Peso Total Levantado)
      {
        type: 'WEIGHT_LIFTED',
        goal: 500,
        name: 'Primeiros Passos',
        description: 'Você levantou 500kg no total! Um começo sólido.',
      },
      {
        type: 'WEIGHT_LIFTED',
        goal: 5000,
        name: 'Força Crescente',
        description: 'Já são 5 toneladas levantadas! Seus músculos agradecem.',
      },
      {
        type: 'WEIGHT_LIFTED',
        goal: 10000,
        name: 'Monstro do Ferro',
        description: '10 toneladas de carga acumulada! Você está imparável.',
      },
      {
        type: 'WEIGHT_LIFTED',
        goal: 50000,
        name: 'Hulk Mode',
        description:
          '50 toneladas levantadas! Uma verdadeira fera na academia.',
      },

      // FEEDBACK_GIVEN (Feedbacks Enviados ao Personal)
      {
        type: 'FEEDBACK_GIVEN',
        goal: 1,
        name: 'Engajado',
        description:
          'Primeiro feedback enviado! Comunicação é chave para evolução.',
      },
      {
        type: 'FEEDBACK_GIVEN',
        goal: 10,
        name: 'Aluno Proativo',
        description: '10 feedbacks dados! Seu personal trainer agradece.',
      },
      {
        type: 'FEEDBACK_GIVEN',
        goal: 30,
        name: 'Colaboração Total',
        description: '30 feedbacks enviados! Sua evolução é prioridade.',
      },
      {
        type: 'FEEDBACK_GIVEN',
        goal: 50,
        name: 'Aluno 5 Estrelas',
        description: '50 feedbacks! O personal já te considera um expert.',
      },
    ],
    skipDuplicates: true, // Evita erro caso já tenha registros iguais no banco
  })

  console.log('🏆 Achievements seed inseridos com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
