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
import { Check, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

enum VehicleType {
  Car = 'Automóvil',
  Truck = 'Camioneta',
  Motorcycle = 'Motocicleta',
}

const Services = {
  Washing: 'Lavado',
  Polishing: 'Pulido',
  Waxing: 'Encerado',
  InteriorCleaning: 'Limpieza Interior',
  EngineWashing: 'Lavado de Motor',
};

type WashService = {
  id: number;
  vehicleType: VehicleType;
  services: string[];
  price: number;
};

export default function CarWashServices() {
  const [washServices, setWashServices] = useState<WashService[]>([
    {
      id: 1,
      vehicleType: VehicleType.Car,
      services: [Services.Washing, Services.Polishing],
      price: 30,
    },
    {
      id: 2,
      vehicleType: VehicleType.Truck,
      services: [Services.Washing, Services.InteriorCleaning],
      price: 45,
    },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newWashService, setNewWashService] = useState<Partial<WashService>>({
    services: [],
  });

  const validateDuplicate = useCallback(
    (serviceToValidate: Partial<WashService>) => {
      return washServices.some(
        (service) =>
          service.vehicleType === serviceToValidate.vehicleType &&
          JSON.stringify(service.services.sort()) ===
            JSON.stringify(serviceToValidate.services?.sort()) &&
          service.id !== editingId
      );
    },
    [washServices, editingId]
  );

  const addWashService = () => {
    if (
      newWashService.vehicleType &&
      newWashService.services &&
      newWashService.services.length > 0 &&
      newWashService.price
    ) {
      if (validateDuplicate(newWashService)) {
        toast('Error', {
          description: 'Ya existe un servicio con estas características',
          duration: 5000,
        });
        return;
      }
      setWashServices([
        ...washServices,
        { id: Date.now(), ...(newWashService as WashService) },
      ]);
      setNewWashService({ services: [] });
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

  const startEditing = (service: WashService) => {
    setEditingId(service.id);
    setNewWashService(service);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setNewWashService({ services: [] });
  };

  const saveEdit = (id: number) => {
    if (validateDuplicate(newWashService)) {
      toast('Error', {
        description: 'Ya existe un servicio con estas características',
        duration: 5000,
      });
      return;
    }
    setWashServices(
      washServices.map((service) =>
        service.id === id
          ? { ...service, ...(newWashService as WashService) }
          : service
      )
    );
    setEditingId(null);
    setNewWashService({ services: [] });
    toast('Éxito', {
      description: 'Servicio actualizado correctamente',
      duration: 5000,
    });
  };

  const deleteWashService = (id: number) => {
    setWashServices(washServices.filter((service) => service.id !== id));
    toast('Éxito', {
      description: 'Servicio eliminado correctamente',
      duration: 5000,
    });
  };

  const toggleService = (service: string) => {
    setNewWashService((prev) => {
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
              {washServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    {editingId === service.id ? (
                      <Select
                        value={
                          newWashService.vehicleType || service.vehicleType
                        }
                        onValueChange={(value) =>
                          setNewWashService({
                            ...newWashService,
                            vehicleType: value as VehicleType,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(VehicleType).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      service.vehicleType
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === service.id ? (
                      <div className="flex flex-wrap gap-2">
                        {Object.values(Services).map((serviceType) => (
                          // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
                          <label
                            key={serviceType}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              checked={(newWashService.services || []).includes(
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
                        value={newWashService.price || service.price}
                        onChange={(e) =>
                          setNewWashService({
                            ...newWashService,
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
                          onClick={() => deleteWashService(service.id)}
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
                    value={newWashService.vehicleType || ''}
                    onValueChange={(value) =>
                      setNewWashService({
                        ...newWashService,
                        vehicleType: value as VehicleType,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo de vehículo" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(VehicleType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(Services).map((serviceType) => (
                      // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
                      <label
                        key={serviceType}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={(newWashService.services || []).includes(
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
                    value={newWashService.price || ''}
                    onChange={(e) =>
                      setNewWashService({
                        ...newWashService,
                        price: Number.parseFloat(e.target.value),
                      })
                    }
                    className="w-24"
                  />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={addWashService}>
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
