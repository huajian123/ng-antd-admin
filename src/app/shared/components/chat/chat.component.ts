/* eslint-disable prettier/prettier */
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { fnGetRandomNum } from '@app/utils/tools';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  @Output() changeShows = new EventEmitter<boolean>();
  validateForm!: FormGroup;
  messageArray: Array<{ msg: string; dir: 'left' | 'right'; isReaded: boolean }> = [];
  isSending = false;
  show = false;
  randomReport: string[] = [
    'Tôi xin lỗi vì tôi không có ở đây bây giờ, tôi không muốn nói chuyện với bạn trong một giây',
    'Xin chào, gửi một phong bì màu đỏ nhân dân tệ để tự động mở khóa chế độ trò chuyện',
    'Xin chào, bây giờ tôi không thấy chán, tôi hy vọng bạn có thể tìm lại tôi khi tôi chán',
    'Đứa con xinh xắn của bạn đang chạy nhanh đến giao diện trò chuyện của bạn trong tám trăm dặm',
    'Magic Immortal Castle đánh thức bạn sau giấc ngủ ngắn',
    'Dòng đặc biệt của Lâu đài Tiên thuật Gulugulu đang kết nối bạn',
    'Đừng làm phiền tôi, tôi đang sôi sục Oooooo',
    'Papa Antique Store, vui lòng để lại tin nhắn nếu bạn có bất cứ điều gì',
    'Tôi không quay lại mà đi kéo củ cải Ooo',
    'Tôi không thích trả lời tin nhắn, tôi cảm thấy mình là người không làm phiền trong cuộc đời mình',
    'Đối với dịch vụ thủ công, vui lòng nhấn phím 1',
    'Heartbeat hiện đã được bán hết, chào mừng bạn đến thăm lần sau',
    'Đi đến vũ trụ để hái các vì sao, sớm trở lại',
    'Đừng tìm tôi, tôi có thứ cần gọi tiền',
    'Xin chào, tôi là người trả lời tự động, đối tác trò chuyện của bạn tạm thời vắng mặt',
    'Bạn có thể trò chuyện với tôi, nhưng đây là tất cả những gì tôi có thể nói',
    'Bạn đang làm gì vậy, tôi là ông của bạn',
    'Chúc mừng bạn đã mở khóa được cô bé xinh xắn của tôi',
    'Tôi sẽ mua một ít cam, bạn ở đây, đừng di chuyển',
    'Tôi sẽ là Xizhilang, và tôi sẽ trở lại và mang theo bạn một phi hành gia',
    'Bên kia đang cố gắng kết nối với bạn, vui lòng đợi trong giây lát, tiến độ hiện tại là 1%',
    'Trời ơi, đau não, đau não, không có tiền trả internet, đau não quá',
    'Chào mừng bạn đến với đường dây nóng của dịch vụ điêu khắc cát, vui lòng nhấn phím 1 để trò chuyện thủ công, nhấn phím 2 để trò chuyện thoại và nhấn phím 3 để trò chuyện video',
    'Kỹ năng phục hồi đang giảm nhiệt',
    'Tin nhắn của bạn đã được gửi, bên kia đã nhận được, nhưng sẽ không trả lời',
    'Xin lỗi, người dùng mà bạn đã liên hệ quá tốt',
    'Nó đã bị Tencent xóa, vui lòng liên hệ 10086 để biết chi tiết',
    'Chờ tôi, lát nữa tôi sẽ dùng Fang Tian Hua Ji để cắt táo cho bạn',
    'Hãy nhập 520 lần anh yêu em và gọi cho anh',
    'Nếu bạn không trả lời tin nhắn, bạn đang chăn cừu, nếu bạn không trả lời mọi lúc, con cừu bị lạc',
    'Bởi vì công thức bí mật của tổ tiên của lâu đài King Crab đã bị rò rỉ ở đây, Cục Giám sát Hàng hải đã bắt được cô ấy, và cô ấy sẽ chủ động liên hệ với bạn khi cô ấy được thả',
    'Chà, bạn cứ tiếp tục đi, tôi đang nghe đây',
    'Em là vẻ đẹp của mùa hè',
    'sẽ trả lời trong khoảng thời gian nếm thử',
    'Trên đường có hẹn với anh',
    'Này, đây là King Crab ở Bikini Beach và tôi đang rán miếng chả trong một chiếc bánh burger siêu cua,',
    'Nếu bạn có bất cứ điều gì, hãy tìm Brother Octopus, Dudu Dudu',
    'Tôi và xx sắp trở thành nhà du hành vũ trụ, quay lại bắt người ngoài hành tinh giúp bạn',
    'chết chìm trong đại dương học tập',
    'Tôi đến Houshan với con quỷ già của Montenegro để thảo luận về vấn đề ăn Tang Seng, và tôi sẽ quay lại khi có điều gì cần nói. ',
    'Gì?',
    'Bạn lên tiếng! Tôi không thể nghe thấy! ',
    'Nếu bạn không quay lại, bạn đang ở trong hẻm núi',
    'Nếu bạn không trở lại, bạn sẽ bị chôn vùi trong hẻm núi',
    'Nếu bạn không trả lời, bạn đang ăn thịt gà',
    'Nếu bạn không quay lại, bạn sẽ bị gà ăn thịt',
    'Tôi đã đến vũ trụ',
    'Hãy quay lại để chọn những vì sao cho bạn',
    'Xin chào',
    'Ông chủ của chúng tôi đang cứu thiên hà',
    'Trở lại sau khi chiến đấu với con quái vật',
    'Bạn sẽ gặp anh ấy trong giây lát',
    'Người chủ nói rằng nếu muốn theo dõi cô ấy, cô ấy cần một gói khoai tây chiên',
    'Các chủ ao cá đã ra ngoài giăng lưới và quay lại để ban ơn cho bạn',
    'Tôi sẽ nói về nó vào buổi tối, trường mẫu giáo vẫn chưa tan học',
    'Xin vui lòng đợi một chút, chủ nhân của tôi đang trên đường tới',
    'Nếu bạn không trả lời, bạn đang xin ăn',
    'Người đẹp hãy hét lên ba lần, tôi sẽ xuất hiện ngay lập tức, nếu không có phản hồi nghĩa là không chân thành, hãy hét lên ba lần nữa, v.v.',
    'cảm ơn',
    'Bạn của bạn đang ngoại tuyến, vui lòng chuyển tiền trước rồi liên hệ',
    'Tôi xin lỗi, bên kia dễ thương quá',
    'Có gì đó phải xếp hàng để lấy hẹn',
    'Tôi đang ở trong ánh nắng mặt trời không làm phiền tôi',
    'Có một con ma bên trong, thật bất tiện để trả lời ngay bây giờ',
    'trong nhà tắm',
    'Bên kia đã trúng độc, hãy gửi cho anh yêu em để giải độc',
    'Mạng của bên kia không ổn định, vui lòng thử lại sau',
    'Chờ đã, tôi sẽ xuống thế giới để gặp bạn và những người bình thường khác',
    'Đang rút lui'
  ];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    console.log('Dịch vụ khách hàng đã bị phá hủy');
  }

  close(): void {
    this.changeShows.emit(false);
  }

  scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) {}
    });
  }

  clearMsgInput(): void {
    setTimeout(() => {
      this.validateForm.get('question')?.reset();
    });
  }

  sendMessage(msg: string, event: Event): void {
    if (!msg.trim()) {
      event.preventDefault();
      event.stopPropagation();
      this.clearMsgInput();
      return;
    }
    this.messageArray.push({ msg, dir: 'right', isReaded: false });
    this.clearMsgInput();

    setTimeout(() => {
      this.isSending = true;
      this.messageArray.forEach(item => {
        if (item.dir === 'right') {
          item.isReaded = true;
        }
      });
      this.cdr.markForCheck();
    }, 1000);

    setTimeout(() => {
      const index = fnGetRandomNum(0, this.randomReport.length);
      this.messageArray.push({ msg: this.randomReport[index], dir: 'left', isReaded: false });

      this.isSending = false;
      this.scrollToBottom();
      this.cdr.detectChanges();
    }, 3000);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      question: [null]
    });
    this.scrollToBottom();
  }
}
