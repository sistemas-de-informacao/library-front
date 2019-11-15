import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Models
import { Game } from './../../../models/game';
import { Category } from './../../../models/category';

// Services
import { GameService } from 'src/app/services/game.service';
import { CategoryService } from './../../../services/category.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})

export class GameDetailsComponent implements OnInit, OnDestroy {

  inscricao: Subscription;

  id: number;
  jogo: Game;
  tipoConta = 0;

  categoria: Category;

  constructor(private route: ActivatedRoute, private router: Router, private gameService: GameService, private categoriaService: CategoryService) { }

  ngOnInit() {
    this.inscricao = this.route.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams.id;
      this.gameService.getPorId(this.id).subscribe((game: Game) => {
        this.jogo = game;
        this.categoriaService.getPorId(this.jogo.idCategoria).subscribe((categoria: Category) => {
          this.categoria = categoria;
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  irParaEditarJogo(id: number) {
    this.router.navigate(['dashboard/editar-jogo/jogo'], { queryParams: { id } });
  }

}