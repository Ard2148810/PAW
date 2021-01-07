import { Component, OnInit } from '@angular/core';
import {Board} from '../../entities/board';
import {BoardService} from '../../services/board.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Card} from '../../entities/card';
import {List} from '../../entities/list';
import {Label} from '../../entities/label';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {CardService} from '../../services/card.service';
import {ListService} from '../../services/list.service';
import {LabelService} from '../../services/label.service';
import {CommentService} from '../../services/comment.service';
import {ChecklistService} from '../../services/checklist.service';
import {ItemService} from '../../services/item.service';
import {CardAddedEvent, CardClickedEvent, ListAddedEvent} from '../list/list.component';
import {IDate} from 'ng2-date-picker';

@Component({
  selector: 'app-public-board',
  templateUrl: './public-board.component.html',
  styleUrls: ['./public-board.component.sass']
})
export class PublicBoardComponent implements OnInit {

  id: string;
  id2: string;
  data: Board;


  boardReady: boolean;

  error: boolean;
  errorMessage: string;

  activeCard: Card;
  activeList: List;
  activeLabel: Label;
  managingLabels = false;
  editingDate = false;

  labelName = '';
  labelColor = '';

  iconCancel = faTimes;

  editingMembers: boolean;

  constructor(private boardService: BoardService,
              private cardService: CardService,
              private listService: ListService,
              private labelService: LabelService,
              private commentService: CommentService,
              private checklistService: ChecklistService,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router) {
    route.params.subscribe(params => this.id = params.id);
    // route.params.subscribe(params => this.id2 = params.id2);
    this.boardReady = false;
    this.error = false;
  }

  ngOnInit(): void {
    // const hash = this.id + '/' + this.id2;
    const hash = this.id;

    console.log(hash);

    this.boardService.getPublicBoard(hash)
      .subscribe(
        response => {
          this.data = response;

          this.data.lists = this.listService.sortListsByOrder(this.data.lists);
          this.labelService.newBoardActivated(this.data.id, this.data.labels);

          if (this.activeCard) {
            this.setActiveCard(this.activeList.id, this.activeCard.id);
          }

          this.boardReady = true;
          console.log(this.data);
        },
        error => {
          console.log(error);
          // this.displayError(error);
        });
  }

  getBoardDisplayName(): string {
    return this.data ? this.data.name : 'Loading...';
  }

  navigateBack(): void {
    this.router.navigate(['..'])
      .catch(console.log);
  }

  toggleErrorModal(): void{
    this.error = !this.error;
  }

  displayError(message: string): void{
    this.errorMessage = 'ERROR: ' + message;
    console.log(this.errorMessage);
    this.error = true;
  }


  setActiveCard(listId: string, cardId: string): void {
    this.activeList = this.data.lists
      .find(list => list.id === listId);
    this.activeCard = this.activeList.cards
      .find(card => card.id === cardId);
  }

  closeCardModal(): void {
    this.activeCard = null;
    this.activeList = null;
  }

  handleCardClicked(cardClickedEvent: CardClickedEvent): void {
    this.setActiveCard(cardClickedEvent.listId, cardClickedEvent.cardId);
  }

  handleCardAdded(cardData: CardAddedEvent): void {
    this.cardService.addCard(this.data.id, cardData.listId, cardData.cardName).subscribe(data => {
      this.ngOnInit();
    });
  }

  handleListAdded(listData: ListAddedEvent): void {
    this.listService.addList(this.data.id, listData.listName).subscribe(data => {
      this.ngOnInit();
    });
  }

  handleContentUpdated(): void {
    this.ngOnInit();
  }

  handleCardRenamed(name: string, card: Card, list: List): void {
    this.cardService
      .renameCard(this.data.id, list.id, name, card)
      .subscribe(data => this.ngOnInit(), err => console.log);
  }

  isLabelActive(labelId, card: Card): boolean {
    return !!card.labels.find(label => label === labelId);
  }

  rgb2hex(rgb): string {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? '#' +
      ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  }

  handleLabelEditClicked(labelId: string): void {
    if (labelId) {
      this.activeLabel = this.labelService.getLabelDataById(labelId);
    } else {
      this.activeLabel = { id: '', name: 'Label name...', color: { r: 128, g: 128, b: 128, a: 255}};
    }
    this.labelName = this.activeLabel.name;
    const colorRGBA = this.activeLabel.color;
    this.labelColor = this.rgb2hex(`rgba(${colorRGBA.r}, ${colorRGBA.g}, ${colorRGBA.b}, ${colorRGBA.a})`);
  }

  toggleManageLabels(): void {
    this.managingLabels = !this.managingLabels;
  }

  handleLabelEditConfirm(labelName: string, labelColor: string): void {
    console.log({ msg: 'handleLabelEditConfirm', labelName, labelColor });
    const newLabel = {...this.activeLabel, name: labelName, color: labelColor};
    console.log(newLabel);
    if (this.activeLabel.id !== '') {
      this.labelService.updateLabel(this.data.id, this.activeLabel.id, newLabel).subscribe(() => {
        this.ngOnInit();
      });
    } else {
      this.labelService.addLabel(this.data.id, labelName, labelColor).subscribe(() => {
        this.ngOnInit();
      });
    }
    this.activeLabel = null;
  }

  handleDescriptionChanged(description: string, listId: string, cardId: string, boardId: string): void {
    const newCard = { description };
    this.cardService.updateCard(boardId, listId, cardId, newCard)
      .subscribe(() => this.ngOnInit());
  }

  toggleEditingDate(): void {
    this.editingDate = !this.editingDate;
  }

  handleDateChanged(date: IDate, board: Board, list: List, card: Card): void {
    console.log({ msg: 'handleDateChanged', date: date.date.toISOString() });
    this.cardService.updateCardDate(board.id, list.id, card.id, new Date(date.date.toISOString()))
      .subscribe(() => this.ngOnInit());
  }

  handleAddChecklist(activeList: List, activeCard: Card): void {
    this.checklistService.addChecklist(this.data.id, activeList.id, activeCard.id, 'New checklist')
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  handleDeleteCard(boardId: string, listId: string, cardId: string): void {
    this.cardService.deleteCard(boardId, listId, cardId)
      .subscribe(() => {
        this.ngOnInit();
        this.closeCardModal();
      });
  }

  handleAssignLabel(data: Board, list: List, card: Card, label: Label, value: boolean): void {
    if (value) {
      this.cardService.addLabelToCard(data.id, list.id, card.id, label.id)
        .subscribe(() => this.ngOnInit());
    } else {
      this.cardService.removeLabelFromCard(data.id, list.id, card.id, label.id)
        .subscribe(() => this.ngOnInit());
    }
  }

  formatDate(dateISO: string): string {
    if (dateISO === '') {
      return '';
    } else {
      const d = new Date(dateISO);
      return `${d.getUTCDate()}.${d.getUTCMonth() + 1}.${d.getUTCFullYear()} | ${d.getUTCHours()}:${d.getUTCMinutes()}`;
    }
  }

  toggleEditingMembers(): void {
    this.editingMembers = !this.editingMembers;
  }

  isCardMember(teamMember: string, members: string[]): boolean {
    return members.includes(teamMember);
  }

  handleRemoveMember(teamMember: string, list: List, card: Card): void {
    const updatedCard = { members: [] };
    updatedCard.members = card.members.filter(member => member !== teamMember);
    console.log(updatedCard);
    this.cardService.updateCard(this.data.id, list.id, card.id, updatedCard)
      .subscribe(() => this.ngOnInit());
  }

  handleAssignMember(teamMember: string, list: List, card: Card): void {
    this.cardService.addMemberToCard(this.data.id, list.id, card.id, teamMember)
      .subscribe(() => this.ngOnInit());
  }

  handleCardCommentAdded(comment: string, boardId: string, listId: string, cardId: string): void {
    this.commentService.addComment(boardId, listId, cardId, comment)
      .subscribe(() => this.ngOnInit());
  }

  handleDeleteComment(boardId: string, listId: string, cardId: string, commentId: string): void {
    this.commentService.deleteComment(boardId, listId, cardId, commentId)
      .subscribe(() => this.ngOnInit());
  }

}
