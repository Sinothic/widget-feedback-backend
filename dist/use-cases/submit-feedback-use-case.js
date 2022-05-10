"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbackUseCase = void 0;
class SubmitFeedbackUseCase {
    constructor(feedbackRepository, mailAdapter) {
        this.feedbackRepository = feedbackRepository;
        this.mailAdapter = mailAdapter;
    }
    async execute(request) {
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
exports.SubmitFeedbackUseCase = SubmitFeedbackUseCase;
