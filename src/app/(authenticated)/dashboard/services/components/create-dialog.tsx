"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

import { createService } from "../actions";
import { createServiceSchema } from "../schemas";
import { CreateService, VehicleTypesForCombobox } from "../schemas";

interface CreateVehicleTypeDialogProps {
  vehicleTypes: VehicleTypesForCombobox;
}

export const CreateServiceDialog: React.FC<CreateVehicleTypeDialogProps> = ({
  vehicleTypes,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { execute, isExecuting } = useAction(createService, {
    onSuccess: () => {
      toast.success("Service created successfully");
      setIsOpen(false);
    },
    onError: (e) => {
      toast.error(e.error.serverError);
    },
  });

  const form = useForm<CreateService>({
    resolver: zodResolver(createServiceSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    execute(data);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto" size={"sm"}>
          Add a service
          <PlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a service</DialogTitle>
          <DialogDescription>This will create a new service.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Example Service" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example Description"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Example Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vehicleType"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Vehicle Types</FormLabel>
                </div>
                {vehicleTypes &&
                  vehicleTypes.map((vehicle) => (
                    <FormField
                      key={vehicle.label}
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => {
                        const currentValues = field.value || [];
                        return (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={currentValues.includes(vehicle.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...currentValues,
                                        vehicle.value,
                                      ])
                                    : field.onChange(
                                        currentValues.filter(
                                          (v) => v !== vehicle.value,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {vehicle.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="flex flex-wrap gap-2">
            {vehicleTypes &&
              Object.values(vehicleTypes).map((vehicle) => (
                <label
                  key={vehicle.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox //customize checkbox if needed
                    value={vehicle.value}
                    checked={selectedVehicles.includes(vehicle.value)}
                    onCheckedChange={() => toggleService(vehicle.value)}
                  />
                  <span>{vehicle.value}</span>
                </label>
              ))}
          </div> */}

          <Button disabled={isExecuting} onClick={onSubmit}>
            Create Service
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
