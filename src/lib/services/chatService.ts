import axiosClient from "src/lib/axios";

export interface ChatMessageDto {
  message: string;
  conversationId?: string;
}

export const sendMessage = async (
  data: ChatMessageDto,
) => {
  const res = await axiosClient.post("/chat/message", data);
  return res.data;
};
