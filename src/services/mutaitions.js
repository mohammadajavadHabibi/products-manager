import { useMutation } from "@tanstack/react-query";
import api from "../configs/Api";


const useRegister = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/auth/register", data);
      return res; // چون interceptor داده‌ها رو گرفته، res همون response.data هست
    },
  });
};

const useLogin = () => {
  const mutationFn = (data) => {
    return api.post("/auth/login", data);
  };

 return useMutation({mutationFn});
};

export { useRegister,useLogin };
