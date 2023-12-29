import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy, Output, EventEmitter, ChangeDetectorRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { fnGetRandomNum } from '@app/utils/tools';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzCardModule, NzTypographyModule, NzGridModule, NzAvatarModule, NzResultModule, NzIconModule, NzButtonModule, FormsModule, ReactiveFormsModule, NzInputModule]
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  @Output() readonly changeShows = new EventEmitter<boolean>();
  validateForm!: FormGroup;
  messageArray: Array<{ msg: string; dir: 'left' | 'right'; isReaded: boolean }> = [];
  isSending = false;
  show = false;
  randomReport: string[] = [
    '抱歉我现在有事不在 等一下也不想理你',
    '您好，发送一元红包自动解锁聊天模式',
    '您好，我现在不无聊 希望无聊时您再找我',
    '您的小可爱正八百里加急赶往你的聊天界面',
    '魔仙堡打盹中醒了回你',
    '咕噜咕噜魔仙堡专线在为你接通',
    '不要烦我噢，我在冒泡泡Oooooo',
    '老爹古董店，有事请留言',
    '俺没回就是去拔萝卜了Ooo',
    '我不喜欢回消息，感觉我上辈子就是个免打扰',
    '人工服务请按1',
    '目前心动已售完，欢迎下次光临',
    '去宇宙摘星星啦，马上回来',
    '别找我，有事打钱',
    '你好，我是自动回复，您的聊天对象暂时不在',
    '您可以和我聊天，但是我也只会这一句',
    '干啥，我是你牛爷爷',
    '恭喜你解锁我这只小可爱',
    '我买几个橘子去，你就在此地，不要走动',
    '我去当喜之郎了，回来带太空人给你',
    '对方正尝试与您连接，请稍等，当前进度1 %',
    '唉呀妈呀脑瓜疼，脑瓜疼，没钱交网费脑瓜疼',
    '欢迎使用沙雕服务热线，手动聊天请按1，语音聊天请按2，视频聊天请按3',
    '回复技能冷却中',
    '您的消息已送达，对方收到，就是不回',
    '对不起，您所联系的用户太过优秀',
    '已被腾讯删除，想了解详情请咨询10086',
    '稍等我，待会我用方天画戟给你削苹果吃',
    '请输入520次我爱你召唤本人',
    '没回信息就是在放羊，一直没回就是羊丢了',
    '这边因泄露了蟹堡王的祖传秘方，海洋监管局已将她抓获，待释放之时她会主动与您联系',
    '嗯，你继续说，我听着呢',
    '你是夏日限定的美好',
    '会在赏味期内回复',
    '在赶来与你赴约的路上',
    '喂，这里是比基尼海滩的蟹堡王餐厅，我正在煎放在超级蟹黄堡里的肉饼，',
    '有事请找章鱼哥，嘟嘟嘟嘟嘟',
    '我和xx去当太空人了，回来给你抓外星人',
    '在学习的海洋里溺死了',
    '我和黑山老妖去后山讨论吃唐僧的事情，有事回来再说。',
    '干哈?',
    '你大声点！我听不见！',
    '不回就是在峡谷',
    '一直不回就是被峡谷埋了',
    '不回就是在吃鸡',
    '一直不回就是被鸡吃了',
    '我去宇宙了',
    '回来摘星星给你',
    '你好',
    '我们老大正在拯救银河系',
    '打完怪兽就回来',
    '稍等一下你就会见到他了',
    '主人说要想知道她的踪迹需要一包番茄味薯片',
    '鱼儿们塘主出去撒网了回来宠幸你们',
    '有什么事晚上再说，幼儿园还没放学',
    '客官请稍等，主子正在路上',
    '没回消息就是在要饭',
    '请大喊三声美女，我会马上出现，如没反应，说明不真诚，请再喊三声，以此类推',
    '谢谢',
    '你的好友已下线，请先转账后联系',
    '对不起，对方太可爱，',
    '有事情排队预约',
    '我在晒太阳别打扰我',
    '有内鬼，现在不方便回复',
    '在洗澡',
    '对方已中毒，发送我爱你即可解毒',
    '对方网络不稳定，请稍后重试',
    '等会再下凡见见尔等凡夫俗子',
    '闭关修炼中'
  ];

  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  ngOnDestroy(): void {
    console.log('客服功能销毁了');
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
