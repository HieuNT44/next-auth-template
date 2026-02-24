"use client";

import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload } from "lucide-react";

interface ChangeAvatarSectionProps {
  currentImageUrl?: string;
}

export function ChangeAvatarSection({
  currentImageUrl,
}: ChangeAvatarSectionProps) {
  const t = useTranslations("profile.settings.changeAvatar");

  return (
    <Card className='change-avatar-section'>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col items-start gap-4'>
        <div className='flex items-center gap-4'>
          <Avatar className='h-20 w-20'>
            <AvatarImage src={currentImageUrl} alt='Avatar' />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-medium'>{t("currentAvatar")}</p>
            <p className='text-muted-foreground text-xs'>{t("uploadHint")}</p>
          </div>
        </div>
        <Button type='button' variant='outline' size='sm' disabled>
          <Upload className='mr-2 h-4 w-4' />
          {t("upload")}
        </Button>
        <p className='text-muted-foreground text-xs'>{t("comingSoon")}</p>
      </CardContent>
    </Card>
  );
}
