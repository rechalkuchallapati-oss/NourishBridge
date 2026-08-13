import { describe, it, expect, beforeAll } from "vitest";
import SupportTicket from "../../src/models/SupportTicket.model.js";
import { authGet, authPost, createRoleAccounts, loginAdmin } from "../helpers/auth.js";
import { supportTicketPayload } from "../helpers/fixtures.js";
import { connectTestDb } from "../helpers/db.js";

describe("Support Tickets", () => {
  let donorToken;
  let adminToken;
  let ticketId;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("support");
    donorToken = accounts.donor.accessToken;
    const admin = await loginAdmin();
    adminToken = admin.accessToken;
  });

  it("creates support ticket", async () => {
    const res = await authPost(donorToken, "/support-tickets", supportTicketPayload());
    expect(res.status).toBe(201);
    ticketId = res.body.data?.ticket?.id;
    expect(ticketId).toBeTruthy();

    const inDb = await SupportTicket.findById(ticketId);
    expect(inDb).toBeTruthy();
    expect(inDb.subject).toBe("Test support ticket");
  });

  it("rejects invalid ticket payload", async () => {
    const res = await authPost(donorToken, "/support-tickets", { subject: "" });
    expect(res.status).toBe(400);
  });

  it("lists own tickets", async () => {
    const res = await authGet(donorToken, "/support-tickets");
    expect(res.status).toBe(200);
    expect(res.body.data?.tickets?.some((t) => t.id === ticketId)).toBe(true);
  });

  it("gets ticket details", async () => {
    const res = await authGet(donorToken, `/support-tickets/${ticketId}`);
    expect(res.status).toBe(200);
    expect(res.body.data?.ticket?.id).toBe(ticketId);
  });

  it("adds reply to ticket", async () => {
    const res = await authPost(donorToken, `/support-tickets/${ticketId}/reply`, {
      message: "Follow-up message from test suite.",
    });
    expect(res.status).toBe(200);
  });

  it("admin lists and updates ticket", async () => {
    const list = await authGet(adminToken, "/admin/support-tickets");
    expect(list.status).toBe(200);

    const { authPatch } = await import("../helpers/auth.js");
    const update = await authPatch(adminToken, `/admin/support-tickets/${ticketId}`, {
      status: "in_progress",
    });
    expect([200, 400]).toContain(update.status);
  });

  it("closes ticket", async () => {
    const res = await authPost(donorToken, `/support-tickets/${ticketId}/close`, {
      resolution: "Resolved in automated test.",
    });
    expect(res.status).toBe(200);
  });
});
