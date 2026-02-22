import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyOTP = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data) => {
    console.log("OTP:", data.otp);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="flex w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            <h1 className="text-2xl font-bold">Verify OTP</h1>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel>OTP</FieldLabel>

                  <Controller
                    name="otp"
                    control={control}
                    rules={{
                      required: "OTP is required",
                      minLength: {
                        value: 6,
                        message: "OTP must be 6 digits",
                      },
                    }}
                    render={({ field }) => (
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    )}
                  />

                  {errors.otp && <FieldError>{errors.otp.message}</FieldError>}
                </Field>
              </FieldGroup>
            </FieldSet>

            <Button type="submit" className="w-full mt-5">
              Verify
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOTP;
