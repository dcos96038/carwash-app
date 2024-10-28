'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Appointment } from '../../../../../db/schema/appointment';

export default function BackofficeInterface() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [licensePlate, setLicensePlate] = useState('');
  const [scheduletAt, setScheduletAt] = useState('');
  const [estimatedFinishedAt, setEstimatedFinishedAt] = useState<string | null>(
    ''
  );
  const [editing, setEditing] = useState<string | null>(null);

  const addAppointment = () => {
    if (licensePlate && scheduletAt && estimatedFinishedAt) {
      setAppointments([
        ...appointments,
        {
          id: '',
          createdAt: new Date(),
          estimated_finished_at: new Date(estimatedFinishedAt),
          finished_at: new Date(), //TODO: update this
          scheduled_at: new Date(scheduletAt),
          carwashId: '',
          customerId: '',
          status: 'pending',
          updatedAt: new Date(),
        },
      ]);
      setLicensePlate('');
      setScheduletAt('');
      setEstimatedFinishedAt('');
    }
  };

  const updateAppointment = () => {
    if (editing) {
      setAppointments(
        appointments.map((a) =>
          a.id === editing
            ? {
                ...a,
                licensePlate: licensePlate,
                scheduletAt: scheduletAt,
                estimatedFinishedAt: estimatedFinishedAt,
              }
            : a
        )
      );
      setEditing(null);
      setLicensePlate('');
      setScheduletAt('');
      setEstimatedFinishedAt('');
    }
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  const setActualExitTime = (id: string, time: string) => {
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, actualExitTime: time } : a
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pepito warcash</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resumen</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            {appointments.length} autos en el lavadero
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 mb-6">
        <Input
          placeholder="Placa del auto"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
        />
        <Input
          type="time"
          placeholder="Hora de entrada"
          value={scheduletAt}
          onChange={(e) => setScheduletAt(e.target.value)}
        />
        <Input
          type="time"
          placeholder="Hora estimada de salida"
          value={estimatedFinishedAt?.toString()}
          onChange={(e) => setEstimatedFinishedAt(e.target.value)}
        />
        <Button onClick={editing ? updateAppointment : addAppointment}>
          {editing ? 'Actualizar Turno' : 'Agregar Turno'}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Placa</TableHead>
            <TableHead>Hora de Entrada</TableHead>
            <TableHead>Hora Estimada de Salida</TableHead>
            <TableHead>Hora Real de Salida</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{'asd123'}</TableCell>
              <TableCell>{appointment.scheduled_at.toString()}</TableCell>
              <TableCell>
                {appointment.estimated_finished_at?.toString()}
              </TableCell>
              <TableCell>
                <Input
                  type="time"
                  value={appointment.finished_at!.toString()}
                  onChange={(e) =>
                    setActualExitTime(appointment.id, e.target.value)
                  }
                  placeholder="Hora real de salida"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  // onClick={() => editAppointment(appointment.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteAppointment(appointment.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
