declare namespace Express {
  interface Request {
    user: { uuid: string };
    token: string;
    adm_id: string;
  }
}
