export interface RequestResponse <T = unknown> {
  status: number;
  success: boolean;
  message: string;
  data?: T;
}