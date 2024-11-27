import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import trimText from "@/utils/trimText";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const DialogAddress = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="underline m-1 text-black cursor-pointer pr-16">
          {trimText("Phường Hiệp Bình Phước, huyện Nhà Bè, TP. Hồ Chí Minh", 30)}
        </div>
      </DialogTrigger>
      <DialogContent className="w-3/4">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-normal pb-3">
            Địa chỉ giao hàng
          </DialogTitle>
          <DialogDescription>
            Hãy chọn địa chỉ nhận hàng để được dự báo thời gian giao hàng cùng
            phí đóng gói, vận chuyển một cách chính xác nhất.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">
                Phường Hiệp Bình Phước, huyện Nhà Bè, TP. Hồ Chí Minh
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Thủ Đức, Thành Phố Hồ Chí Minh</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">Chọn khu vực giao hàng khác</Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter className={"md:justify-center"}>
          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-400 text-white font-normal px-10"
          >
            Giao đến địa chỉ này
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddress;
