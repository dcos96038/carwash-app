"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ComboBox } from "@/components/combo-box";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createCarwash } from "../actions";
import {
  CreateCarwash,
  UsersForCombobox,
  createCarwashSchema,
} from "../schemas";

interface CreateCarwashDialogProps {
  users: UsersForCombobox;
}

export const CreateCarwashDialog: React.FC<CreateCarwashDialogProps> = ({
  users,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, isExecuting } = useAction(createCarwash, {
    onSuccess: () => {
      toast.success("Carwash created successfully");
      setIsOpen(false);
    },
    onError: (e) => {
      toast.error(e.error.serverError);
    },
  });

  const form = useForm<CreateCarwash>({
    resolver: zodResolver(createCarwashSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    execute(data);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto" size={"sm"}>
          Add a car wash
          <PlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a car wash</DialogTitle>
          <DialogDescription>
            This will create a new car wash location.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Example Carwash" {...field} />
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
                <FormLabel>
                  Email
                  <span className="text-gray-400"> (Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@provider.com"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Logo
                  <span className="text-gray-400"> (Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/logo.png"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Contact Number
                  <span className="text-gray-400"> (Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="123-456-7890"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="owner_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Owner</FormLabel>
                <FormControl>
                  <ComboBox
                    options={users || []}
                    placeholder="Select an owner..."
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="San martin 456, lules, tucuman"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input placeholder="40.7128" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input placeholder="-74.006" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="openingHours"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Opening Hours
                    <span className="text-gray-400"> (HH:MM)</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="time" placeholder="08:00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="closingHours"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Closing Hours
                    <span className="text-gray-400"> (HH:MM)</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="time" placeholder="08:00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isExecuting} onClick={onSubmit}>
            Create Carwash
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
