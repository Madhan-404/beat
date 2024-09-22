import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const BLUR_FADE_DELAY = 0.04;

export default function CreateProfile() {
  return (
    <section className="w-full min-h-[calc(100vh-65px)] flex justify-center items-center">
      <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
        <Card className="w-[400px]">
          <CardHeader>
            <BlurFade delay={BLUR_FADE_DELAY * 5} inView>
              <CardTitle>Create profile</CardTitle>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 6} inView>
              <CardDescription>
                Create your profile in one-click.
              </CardDescription>
            </BlurFade>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col w-full justify-center gap-4">
                <BlurFade delay={BLUR_FADE_DELAY * 7} inView>
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 8} inView>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter your username" />
                  </div>
                </BlurFade>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <BlurFade delay={BLUR_FADE_DELAY * 9} inView>
              <Button className="w-full">Create profile</Button>
            </BlurFade>
          </CardFooter>
        </Card>
      </BlurFade>
    </section>
  );
}
