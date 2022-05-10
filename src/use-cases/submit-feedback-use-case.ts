import { MailAdapter } from "../adapters/mail-adpater";
import { FeedbackRepository } from "../repositories/feedback-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {}
  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required");
    }

    if (!comment) {
      throw new Error("Type is required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format");
    }

    await this.feedbackRepository.create(request);

    await this.mailAdapter.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div>`,
        `<p>Tipo do Feedback: ${type} </p>`,
        `<p>Comentário: ${comment} </p>`,
        `<p>Screnshot: <img src="${screenshot}">  </p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
