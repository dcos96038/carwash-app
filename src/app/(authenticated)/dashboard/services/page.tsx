'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Service, VehicleTypeEnum } from '@/types/services.types';
import { Check, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const [services, setServices] = useState<Service[]>();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({
    services: [],
  });

  const validateDuplicate = useCallback(
    (serviceToValidate: Partial<Service>) => {
      return services.some(
        (service) =>
          service.VehicleTypeEnum === serviceToValidate.VehicleTypeEnum &&
          JSON.stringify(service.services.sort()) ===
            JSON.stringify(serviceToValidate.services?.sort()) &&
          service.id !== editingId
      );
    },
    [services, editingId]
  );

  const addService = () => {
    if (
      newService.VehicleTypeEnum &&
      newService.services &&
      newService.services.length > 0 &&
      newService.price
    ) {
      if (validateDuplicate(newService)) {
        toast('Error', {
          description: 'Ya existe un servicio con estas características',
          duration: 5000,
        });
        return;
      }
      setServices([
        ...services,
        { id: Date.now(), ...(newService as Service) },
      ]);
      setNewService({ services: [] });
      toast('Éxito', {
        description: 'Servicio agregado correctamente',
        duration: 5000,
      });
    } else {
      toast('Error', {
        description:
          'Por favor, complete todos los campos y seleccione al menos un servicio',
        duration: 5000,
      });
    }
  };

  const startEditing = (service: Service) => {
    setEditingId(service.id);
    setNewService(service);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setNewService({ services: [] });
  };

  const saveEdit = (id: number) => {
    if (validateDuplicate(newService)) {
      toast('Error', {
        description: 'Ya existe un servicio con estas características',
        duration: 5000,
      });
      return;
    }
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, ...(newService as Service) } : service
      )
    );
    setEditingId(null);
    setNewService({ services: [] });
    toast('Éxito', {
      description: 'Servicio actualizado correctamente',
      duration: 5000,
    });
  };

  const deleteService = (id: number) => {
    setServices(services.filter((service) => service.id !== id));
    toast('Éxito', {
      description: 'Servicio eliminado correctamente',
      duration: 5000,
    });
  };

  const toggleService = (service: string) => {
    setNewService((prev) => {
      const services = prev.services || [];
      return {
        ...prev,
        services: services.includes(service)
          ? services.filter((s) => s !== service)
          : [...services, service],
      };
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Gestión de Servicios de Lavado</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo de Vehículo</TableHead>
                <TableHead>Servicios</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    {editingId === service.id ? (
                      <Select
                        value={
                          newService.VehicleTypeEnum || service.VehicleTypeEnum
                        }
                        onValueChange={(value) =>
                          setNewService({
                            ...newService,
                            VehicleTypeEnum: value as VehicleTypeEnum,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(VehicleTypeEnum).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      service.VehicleTypeEnum
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === service.id ? (
                      <div className="flex flex-wrap gap-2">
                        {Object.values(services).map((serviceType) => (
                          // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
                          <label
                            key={serviceType}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              checked={(newService.services || []).includes(
                                serviceType
                              )}
                              onCheckedChange={() => toggleService(serviceType)}
                            />
                            {serviceType}
                          </label>
                        ))}
                      </div>
                    ) : (
                      service.services.join(', ')
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === service.id ? (
                      <Input
                        type="number"
                        value={newService.price || service.price}
                        onChange={(e) =>
                          setNewService({
                            ...newService,
                            price: Number.parseFloat(e.target.value),
                          })
                        }
                        className="w-24"
                      />
                    ) : (
                      `$${service.price.toFixed(2)}`
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === service.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => saveEdit(service.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={cancelEditing}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => startEditing(service)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Select
                    value={newService.VehicleTypeEnum || ''}
                    onValueChange={(value) =>
                      setNewService({
                        ...newService,
                        VehicleTypeEnum: value as VehicleTypeEnum,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo de vehículo" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(VehicleTypeEnum).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(services).map((serviceType) => (
                      <label
                        key={serviceType}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={(newService.services || []).includes(
                            serviceType
                          )}
                          onCheckedChange={() => toggleService(serviceType)}
                        />
                        <span>{serviceType}</span>
                      </label>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Precio"
                    value={newService.price || ''}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        price: Number.parseFloat(e.target.value),
                      })
                    }
                    className="w-24"
                  />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={addService}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
