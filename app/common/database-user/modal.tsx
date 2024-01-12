/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { VscLoading } from "react-icons/vsc/index.js";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useEffectOnce } from "~/hook/use_effect_once";
import {
  ResponseData,
  ResponseDataTable,
  RoleResponseType,
  UserDatabaseResponseType,
} from "~/interface/response_interface";
import axiosFunc from "~/lib/axios_func";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Must be valid email address" }),
  password: z.string().min(5, {
    message: "password must be at least 5 characters.",
  }),
  user_role: z
    .number()
    .int()
    .refine((value) => value >= 0, {
      message: "Please select a valid role",
    }),
});

type BodyModalProps = {
  refreshData: () => void;
  closeModal: () => void;
  data?: UserDatabaseResponseType;
};

const BodyModalUserCreate = ({
  refreshData,
  closeModal,
  data,
}: BodyModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingRole, setLoadingRole] = useState<boolean>(false);
  const [dataRoles, setDataRoles] = useState<RoleResponseType[] | []>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "12345",
      user_role: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const url = `/api/v1/userRegister`;
    const response = await axiosFunc({
      method: "post",
      url: url,
      data: values,
    });
    const res: ResponseData<any> = response?.data;
    if (res.code == 200) {
      refreshData();
      toast.success("User Created");
      setTimeout(() => {
        closeModal();
        setLoading(false);
      }, 800);
    } else {
      setLoading(false);
    }
  }

  const getRoleData = async () => {
    setLoadingRole(true);
    const url = `/api/v1/role?page=1&limit=20`;
    const response = await axiosFunc({
      method: "get",
      url: url,
    });
    const res: ResponseDataTable<RoleResponseType[]> = response?.data;
    if (res.code == 200) {
      setDataRoles(res.listData || []);
      setLoadingRole(false);
    } else {
      setLoadingRole(false);
    }
  };

  useEffectOnce(() => {
    getRoleData();
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user_role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roles</FormLabel>
              <Select
                disabled={loadingRole ? true : false}
                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dataRoles.map((role) => (
                    <SelectItem key={role.id} value={`${role.id}`}>
                      {role.role_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {loading ? (
          <Button disabled>
            <VscLoading className="mt-2 mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="mt-2">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export { BodyModalUserCreate };
