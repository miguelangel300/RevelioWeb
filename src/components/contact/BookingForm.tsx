
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Send } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { handleBookingInquiry, BookingInquiryData } from "@/app/actions";

const BookingInquirySchema = z.object({
  clientName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce una dirección de correo electrónico válida." }),
  phone: z.string().min(7, { message: "Introduce un número de teléfono válido." }),
  weddingDate: z.date({ required_error: "La fecha de la boda es obligatoria." }),
  venue: z.string().min(2, { message: "El lugar debe tener al menos 2 caracteres." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }).max(1000, { message: "El mensaje no puede exceder los 1000 caracteres." }),
  privacyPolicy: z.boolean().refine(val => val === true, {
    message: "Debes aceptar la política de privacidad para continuar."
  })
});

type BookingFormValues = z.infer<typeof BookingInquirySchema>;

export default function BookingForm() {
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(BookingInquirySchema),
    defaultValues: {
      clientName: "",
      email: "",
      phone: "",
      venue: "",
      message: "",
      privacyPolicy: false,
    },
  });

  async function onSubmit(values: BookingFormValues) {
    const dataToSubmit: BookingInquiryData = {
      ...values,
      weddingDate: format(values.weddingDate, "yyyy-MM-dd"),
    };

    const result = await handleBookingInquiry(dataToSubmit);

    if (result.success) {
      toast({
        title: "¡Consulta Enviada!",
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        title: "Error de Envío",
        description: "Hubo un problema al enviar tu consulta. Por favor, revisa los campos e inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto p-6 md:p-8 bg-card/90 border border-primary/20 rounded-2xl shadow-2xl backdrop-blur">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vuestros Nombres</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Alex y Dani" {...field} />
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
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="vuestro@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Ej: 600123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="weddingDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de la Boda</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Elegid una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lugar de la Boda</FormLabel>
                <FormControl>
                  <Input placeholder="Finca, restaurante, ciudad..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contadnos más sobre vosotros y vuestra boda</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="¿Cómo os conocisteis? ¿Qué tipo de celebración tenéis en mente? ¿Qué es lo más importante para vosotros en la fotografía de vuestra boda?"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="privacyPolicy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Aceptación de la Política de Privacidad</FormLabel>
                <FormDescription>
                  He leído y acepto la <Link href="/privacy-policy" className="underline hover:text-primary" target="_blank">política de privacidad</Link> para el tratamiento de mis datos.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Enviando..." : <>Enviar Mensaje <Send className="ml-2 h-5 w-5" /></>}
        </Button>
      </form>
    </Form>
  );
}
