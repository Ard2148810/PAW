import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '../../services/board.service';
import { Board } from '../../entities/board';
import { first } from 'rxjs/operators';
import { Card } from '../../entities/card';
import { CardAddedEvent, CardClickedEvent, ListAddedEvent } from '../list/list.component';
import { CardService } from '../../services/card.service';
import { ListService } from '../../services/list.service';
import { List } from '../../entities/list';
import { LabelService } from '../../services/label.service';
import { Label } from '../../entities/label';
import { IDate } from 'ng2-date-picker';
import { CommentService } from '../../services/comment.service';
import { ChecklistService } from '../../services/checklist.service';
import { ItemService } from '../../services/item.service';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})

export class BoardComponent implements OnInit {
  id: string;
  data: Board;

  boardReady: boolean;

  addingUser: boolean;
  makingPublic: boolean;
  deletingBoard: boolean;

  error: boolean;
  errorMessage: string;

  makingPublicMessage: string;
  publicLink: string;

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
    this.boardReady = false;
    this.addingUser = false;
    this.makingPublic = false;
    this.deletingBoard = false;
    this.error = false;
  }

  ngOnInit(): void {
    this.boardService.getBoard(this.id).subscribe(data => {
      this.data = data;
      this.data.lists = this.listService.sortListsByOrder(this.data.lists);
      this.labelService.newBoardActivated(this.data.id, this.data.labels);

      if (this.activeCard) {
        this.setActiveCard(this.activeList.id, this.activeCard.id);
      }

      this.boardReady = true;

      if (!this.data.isPublic){
        this.setPrivate();
      }
      else{
        this.setPublic();
      }

      console.log('Received board:');
      console.log(this.data);
    });

  }

  getBoardDisplayName(): string {
    return this.data ? this.data.name : 'Loading...';
  }

  navigateBack(): void {
    this.router.navigate(['..'])
      .catch(console.log);
  }

  toggleAddingUserModal(): void{
    this.addingUser = !this.addingUser;
  }

  toggleMakingPublicModal(): void{
    this.makingPublic = !this.makingPublic;
  }

  toggleDeletingBoardModal(): void{
    this.deletingBoard = !this.deletingBoard;
  }

  toggleErrorModal(): void{
    this.error = !this.error;
  }

  handleRenameBoard(name: string): void {
    this.boardService.updateBoard(this.data.id, name, this.data.description, this.data.isPublic).subscribe(
      response => {
        console.log(response);
      },
      error => {
        this.displayError(error);
      });
  }

  addUserToBoard(username: string): void{
    this.boardService.addUserToBoard(this.data.id, username)
    .subscribe(
      response => {
        console.log(response);
        this.data.teamMembers = response;
      },
      error => {
        this.displayError(error);
      });

    this.addingUser = false;
  }

  deleteUserFromBoard(username: string): void{
    this.boardService.deleteUserFromBoard(this.data.id, username)
    .subscribe(
      response => {
        console.log(response);
        this.data.teamMembers = response;
      },
      error => {
        this.displayError(error);
      });
  }

  deleteBoard(): void{
    if (!this.data.id){
      this.navigateBack();
      return;
    }

    this.boardService.deleteBoard(this.data.id)
      .pipe(first())
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          this.displayError(error);
        });

    this.boardService.refreshBoards();
    this.navigateBack();
  }

  displayError(message: string): void{
    this.errorMessage = 'ERROR: ' + message;
    console.log(this.errorMessage);
    this.error = true;
  }

  setPublic(): any{
    this.data.isPublic = true;
    this.makingPublicMessage = 'THIS BOARD IS PUBLIC';
    this.getPublicLink();
  }

  setPrivate(): any{
    this.data.isPublic = false;
    this.makingPublicMessage = 'ARE YOU SURE YOU WANT TO MAKE THIS BOARD PUBLIC?';
    this.publicLink = 'None';
  }

  makePublic(): void{
    this.boardService.updateBoard(this.data.id, this.data.name, this.data.description, true).subscribe(
      response => {
        console.log(response);
        this.setPublic();
      },
      error => {
        this.displayError(error);
      });
  }

  getPublicLink(): any {
    this.publicLink = `${window.location.origin}` + '/public-board/' + this.id;
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
    const newCard = {...this.activeCard, description};
    this.cardService.updateCard(boardId, listId, cardId, newCard)
      .subscribe(this.ngOnInit);
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
