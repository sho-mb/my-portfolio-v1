export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    file?: string[]
  };
  message?: string;
  isSuccess: boolean;
};

export type messageState = {
  message: string;
}