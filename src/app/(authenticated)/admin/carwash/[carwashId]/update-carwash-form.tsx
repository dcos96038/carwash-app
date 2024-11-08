"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Carwash } from "@/types/carwash.types";

import { ComboBox } from "@/components/combo-box";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { UsersForCombobox } from "../schemas";
import { updateCarwash } from "./actions";
import { UpdateCarwash, updateCarwashSchema } from "./schemas";

interface UpdateCarwashFormProps {
  users: UsersForCombobox;
  carwash: Carwash;
}

export function UpdateCarwashForm({ users, carwash }: UpdateCarwashFormProps) {
  const boundUpdateCarwash = updateCarwash.bind(null, carwash.id);

  const { execute, isExecuting } = useAction(boundUpdateCarwash, {
    onSuccess: () => {
      toast.success("Carwash updated successfully");
    },
    onError: (e) => {
      console.log(e);

      toast.error(e.error.serverError);
    },
  });

  console.log("Carwash ->", carwash);

  const form = useForm<UpdateCarwash>({
    resolver: zodResolver(updateCarwashSchema),
    defaultValues: {
      owner_id: carwash.owner_id,
      address: carwash.address,
      contactNumber: carwash.contactNumber,
      email: carwash.email,
      latitude: carwash.latitude,
      logo: carwash.logo,
      longitude: carwash.longitude,
      name: carwash.name,
      closingHours: carwash.closingHours.slice(0, 5),
      openingHours: carwash.openingHours.slice(0, 5),
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    execute(data);
  });

  return (
    <div className="flex flex-col gap-4">
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
        <div className="mt-2 flex">
          <Button className="ml-auto" disabled={isExecuting} onClick={onSubmit}>
            Update Carwash
          </Button>
        </div>
      </Form>
    </div>
  );
}
