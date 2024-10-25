"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type Appointment = {
	id: number;
	licensePlate: string;
	entryTime: string;
	estimatedExitTime: string;
	actualExitTime: string;
};

export default function BackofficeInterface() {
	const [appointments, setAppointments] = useState<Appointment[]>([]);
	const [newLicensePlate, setNewLicensePlate] = useState("");
	const [newEntryTime, setNewEntryTime] = useState("");
	const [newEstimatedExitTime, setNewEstimatedExitTime] = useState("");
	const [editing, setEditing] = useState<number | null>(null);

	const addAppointment = () => {
		if (newLicensePlate && newEntryTime && newEstimatedExitTime) {
			setAppointments([
				...appointments,
				{
					id: Date.now(),
					licensePlate: newLicensePlate,
					entryTime: newEntryTime,
					estimatedExitTime: newEstimatedExitTime,
					actualExitTime: "",
				},
			]);
			setNewLicensePlate("");
			setNewEntryTime("");
			setNewEstimatedExitTime("");
		}
	};

	const editAppointment = (id: number) => {
		const appointment = appointments.find((a) => a.id === id);
		if (appointment) {
			setNewLicensePlate(appointment.licensePlate);
			setNewEntryTime(appointment.entryTime);
			setNewEstimatedExitTime(appointment.estimatedExitTime);
			setEditing(id);
		}
	};

	const updateAppointment = () => {
		if (editing) {
			setAppointments(
				appointments.map((a) =>
					a.id === editing
						? {
								...a,
								licensePlate: newLicensePlate,
								entryTime: newEntryTime,
								estimatedExitTime: newEstimatedExitTime,
							}
						: a,
				),
			);
			setEditing(null);
			setNewLicensePlate("");
			setNewEntryTime("");
			setNewEstimatedExitTime("");
		}
	};

	const deleteAppointment = (id: number) => {
		setAppointments(appointments.filter((a) => a.id !== id));
	};

	const setActualExitTime = (id: number, time: string) => {
		setAppointments(
			appointments.map((a) =>
				a.id === id ? { ...a, actualExitTime: time } : a,
			),
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
					value={newLicensePlate}
					onChange={(e) => setNewLicensePlate(e.target.value)}
				/>
				<Input
					type="time"
					placeholder="Hora de entrada"
					value={newEntryTime}
					onChange={(e) => setNewEntryTime(e.target.value)}
				/>
				<Input
					type="time"
					placeholder="Hora estimada de salida"
					value={newEstimatedExitTime}
					onChange={(e) => setNewEstimatedExitTime(e.target.value)}
				/>
				<Button onClick={editing ? updateAppointment : addAppointment}>
					{editing ? "Actualizar Turno" : "Agregar Turno"}
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
							<TableCell>{appointment.licensePlate}</TableCell>
							<TableCell>{appointment.entryTime}</TableCell>
							<TableCell>{appointment.estimatedExitTime}</TableCell>
							<TableCell>
								<Input
									type="time"
									value={appointment.actualExitTime}
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
									onClick={() => editAppointment(appointment.id)}
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
