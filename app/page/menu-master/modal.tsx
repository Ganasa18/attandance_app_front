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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { MenuResponseType, ResponseData } from "~/interface/response_interface";
import axiosFunc from "~/lib/axios_func";

const formSchema = z.object({
  menu_name: z.string().min(2, {
    message: "Menu name must be at least 2 characters.",
  }),
  title_menu: z.string().min(2, {
    message: "Title name must be at least 2 characters.",
  }),
  path: z.string().min(1, {
    message: "path must be at least 2 characters.",
  }),
  is_submenu: z.boolean().default(false).optional(),
  parent_name: z.string().optional(),
});

type BodyModalProps = {
  refreshData: () => void;
  closeModal: () => void;
  data?: MenuResponseType;
};

const BodyModalMenuCreate = ({
  refreshData,
  closeModal,
  data,
}: BodyModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSubmenu, setHasSubmenu] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menu_name: "",
      title_menu: "",
      path: "",
      is_submenu: false,
      parent_name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const url = `/api/v1/menu`;
    const response = await axiosFunc({
      method: "post",
      url: url,
      data: values,
      headers: {
        Authorization: `Bearer 1231245`,
      },
    });
    const res: ResponseData<any> = response?.data;
    if (res.code == 200) {
      refreshData();
      toast.success("Data Menu Created");
      setTimeout(() => {
        closeModal();
        setLoading(false);
      }, 800);
    } else {
      setLoading(false);
      //   toast.error("SOMETHING WENT WRONG");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="menu_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Menu Name</FormLabel>
              <FormControl>
                <Input placeholder="menu_name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title_menu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title Name</FormLabel>
              <FormControl>
                <Input placeholder="Menu Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="path"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Path URL</FormLabel>
              <FormControl>
                <Input placeholder="/path" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_submenu"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Is Submenu</FormLabel>
                <FormDescription>
                  Just disabled feature if not sub item.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    setHasSubmenu(checked);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {hasSubmenu && (
          <FormField
            control={form.control}
            name="parent_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Name</FormLabel>
                <FormControl>
                  <Input placeholder="menu_name" {...field} />
                </FormControl>
                <FormDescription>
                  Fill this like menu_name as parent.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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

export { BodyModalMenuCreate };
