/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { Button } from "~/components/ui/button";
import { VscLoading } from "react-icons/vsc/index.js";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axiosFunc from "~/lib/axios_func";
import { ResponseData, RoleResponseType } from "~/interface/response_interface";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  role_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

type BodyModalProps = {
  refreshData: () => void;
  closeModal: () => void;
  data?: RoleResponseType;
};

const BodyModalRoleCreate = ({
  refreshData,
  closeModal,
  data,
}: BodyModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role_name: data?.role_name ? data.role_name : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const url = `/api/v1/role`;
    const response = await axiosFunc({
      method: "post",
      url: url,
      data: values,
      headers: {
        Authorization: `Bearer 1231245`,
      },
    });
    const res: ResponseData<RoleResponseType> = response?.data;
    if (res.code == 200) {
      refreshData();
      toast.success("Data Role Created");
      setTimeout(() => {
        closeModal();
        setLoading(false);
      }, 800);
    } else {
      setLoading(false);
      toast.error("SOMETHING WENT WRONG");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="role_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>input role name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <Button disabled>
            <VscLoading className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
};

export { BodyModalRoleCreate };
