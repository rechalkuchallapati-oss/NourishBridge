import supportTicketService from "./supportTicket.service.js";
import { sendOk, sendCreated } from "../../utils/responseHandler.js";

const actor = (req) => ({
  id: req.user.id,
  role: req.user.role,
  fullName: req.user.fullName,
});

const listMine = async (req, res) => {
  const result = await supportTicketService.listMyTickets(req.user.id, req.query);
  sendOk(res, "Support tickets fetched", result);
};

const create = async (req, res) => {
  const ticket = await supportTicketService.createTicket(
    req.user.id,
    req.user.role,
    req.user.fullName,
    req.body,
    req,
  );
  sendCreated(res, "Support ticket created", { ticket });
};

const getOne = async (req, res) => {
  const ticket = await supportTicketService.getTicket(req.user.id, req.user.role, req.params.id);
  sendOk(res, "Support ticket fetched", { ticket });
};

const history = async (req, res) => {
  const historyEntries = await supportTicketService.getTicketHistory(
    req.user.id,
    req.user.role,
    req.params.id,
  );
  sendOk(res, "Ticket history fetched", { history: historyEntries });
};

const reply = async (req, res) => {
  const message = await supportTicketService.addTicketReply(
    req.user.id,
    req.user.role,
    req.user.fullName,
    req.params.id,
    req.body.message,
    req,
  );
  sendOk(res, "Reply added", { message });
};

const close = async (req, res) => {
  const ticket = await supportTicketService.closeTicket(
    req.user.id,
    req.user.role,
    req.user.fullName,
    req.params.id,
    req.body.resolution,
    req,
  );
  sendOk(res, "Ticket closed", { ticket });
};

export default { listMine, create, getOne, history, reply, close };
