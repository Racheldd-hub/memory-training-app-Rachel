import { getModeSpecificConfig } from '../constants/games';

export interface NumberMemoryGameState {
  currentSequence: string[];
  userInput: string[];
  level: number;
  score: number;
  timeLeft: number;
  gameState: 'ready' | 'playing' | 'result';
  showSequence: boolean;
  streak: number;
}

export class NumberMemoryGame {
  private state: NumberMemoryGameState;
  private mode: 'elder' | 'young';
  private config: any;

  constructor(mode: 'elder' | 'young') {
    this.mode = mode;
    this.config = getModeSpecificConfig('number-memory', mode);
    this.state = this.getInitialState();
  }

  private getInitialState(): NumberMemoryGameState {
    return {
      currentSequence: [],
      userInput: [],
      level: 1,
      score: 0,
      timeLeft: this.config?.timeLimit || 30,
      gameState: 'ready',
      showSequence: false,
      streak: 0,
    };
  }

  public getState(): NumberMemoryGameState {
    return { ...this.state };
  }

  public startGame(): void {
    this.state = {
      ...this.getInitialState(),
      gameState: 'playing',
    };
    this.nextRound();
  }

  public nextRound(): void {
    const sequenceLength = this.config?.sequenceLength || 3;
    const newSequence = this.generateSequence(sequenceLength + this.state.level - 1);
    
    this.state.currentSequence = newSequence;
    this.state.userInput = [];
    this.state.showSequence = true;
    
    // 自动隐藏序列
    setTimeout(() => {
      this.state.showSequence = false;
    }, this.config?.displayTime || 3000);
  }

  private generateSequence(length: number): string[] {
    const sequence = [];
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      sequence.push(digits[randomIndex]);
    }
    
    return sequence;
  }

  public handleInput(input: string): boolean {
    if (this.state.gameState !== 'playing' || this.state.showSequence) {
      return false;
    }

    const newUserInput = [...this.state.userInput, input];
    this.state.userInput = newUserInput;

    // 检查是否完成序列
    if (newUserInput.length === this.state.currentSequence.length) {
      return this.checkAnswer(newUserInput);
    }

    return true; // 继续输入
  }

  private checkAnswer(input: string[]): boolean {
    const isCorrect = input.every((item, index) => item === this.state.currentSequence[index]);
    
    if (isCorrect) {
      this.state.streak++;
      this.state.score += this.calculateRoundScore();
      this.state.level++;
      
      // 延迟进入下一轮
      setTimeout(() => {
        this.nextRound();
      }, 1000);
      
      return true;
    } else {
      this.endGame();
      return false;
    }
  }

  private calculateRoundScore(): number {
    const baseScore = 10 * this.state.level;
    const timeBonus = Math.floor(this.state.timeLeft / 10) * 5;
    const streakBonus = this.state.streak * 2;
    
    return baseScore + timeBonus + streakBonus;
  }

  public updateTime(): void {
    if (this.state.gameState === 'playing') {
      this.state.timeLeft--;
      if (this.state.timeLeft <= 0) {
        this.endGame();
      }
    }
  }

  public endGame(): void {
    this.state.gameState = 'result';
  }

  public restartGame(): void {
    this.state = this.getInitialState();
  }

  public getCurrentSequence(): string[] {
    return [...this.state.currentSequence];
  }

  public getUserInput(): string[] {
    return [...this.state.userInput];
  }

  public isShowingSequence(): boolean {
    return this.state.showSequence;
  }

  public getGameState(): 'ready' | 'playing' | 'result' {
    return this.state.gameState;
  }

  public getScore(): number {
    return this.state.score;
  }

  public getLevel(): number {
    return this.state.level;
  }

  public getTimeLeft(): number {
    return this.state.timeLeft;
  }

  public getStreak(): number {
    return this.state.streak;
  }
} 