"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submit_feedback_use_case_1 = require("./submit-feedback-use-case");
const submitFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedback = new submit_feedback_use_case_1.SubmitFeedbackUseCase({ create: submitFeedbackSpy }, { sendMail: sendMailSpy });
describe("Submit feedback", () => {
    it("should be able to submit a feedback", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Sample Comment",
            screenshot: "data:image/png;base64,asda1ds981a8s91d98as98d18as",
        })).resolves.not.toThrow();
        expect(submitFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    it("should not be able to submit a feedback without a type", async () => {
        await expect(submitFeedback.execute({
            type: "",
            comment: "Sample Comment",
            screenshot: "data:image/png;base64,asda1ds981a8s91d98as98d18as",
        })).rejects.toThrow();
    });
    it("should not be able to submit a feedback without a comment", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png;base64,asda1ds981a8s91d98as98d18as",
        })).rejects.toThrow();
    });
    it("should not be able to submit a feedback with a invalid screenshot", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Sample Comment",
            screenshot: "screenshot.jpg",
        })).rejects.toThrow();
    });
});
