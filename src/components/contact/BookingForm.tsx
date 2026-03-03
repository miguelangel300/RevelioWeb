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
import { CalendarIcon, ArrowRight } from "lucide-react";
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

const inputClassName = "w-full border-0 border-b border-border bg-transparent py-3 px-0 text-foreground focus-visible:ring-0 focus-visible:border-primary focus-visible:border-b-2 placeholder:text-muted-foreground text-lg transition-colors rounded-none shadow-none h-auto";
const labelClassName = "block font-bold text-muted-foreground mb-1 uppercase tracking-widest text-xs";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>Nombres</FormLabel>
                <FormControl>
                  <Input placeholder="Ana y Juan" className={inputClassName} {...field} />
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
                <FormLabel className={labelClassName}>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="hola@ejemplo.com" className={inputClassName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>Teléfono</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="600123456" className={inputClassName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weddingDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className={labelClassName}>Fecha de la Boda</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          inputClassName,
                          "flex justify-between items-center text-left font-normal bg-transparent hover:bg-transparent px-0",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Día / Mes / Año</span>}
                        <CalendarIcon className="h-4 w-4 opacity-50" />
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
        </div>

        <FormField
          control={form.control}
          name="venue"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClassName}>Lugar / Finca</FormLabel>
              <FormControl>
                <Input placeholder="Ciudad o nombre del lugar" className={inputClassName} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClassName}>Contadnos vuestra historia</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="¿Cómo os conocisteis? ¿Qué es lo más importante para vosotros en la boda?"
                  className={cn(inputClassName, "min-h-[100px] resize-none")}
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
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-muted/20 border border-border rounded-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-medium text-foreground">Aceptación de Privacidad</FormLabel>
                <FormDescription className="text-xs">
                  He leído y acepto la <Link href="/privacy-policy" className="underline hover:text-primary" target="_blank">política de privacidad</Link>.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="pt-6">
          <Button
            type="submit"
            className="group relative inline-flex items-center justify-start overflow-hidden px-8 py-6 font-medium transition-all bg-primary hover:bg-primary/90 text-primary-foreground rounded-sm"
            disabled={form.formState.isSubmitting}
          >
            <span className="mr-3 text-sm uppercase tracking-widest font-bold">
              {form.formState.isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
