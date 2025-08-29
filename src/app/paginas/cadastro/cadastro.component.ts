import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ProdutoService } from '../../servicos/produto.service'; // Verifique o caminho do serviço

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Essencial para o formulário
    RouterModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public formulario!: FormGroup;
  public mensagem: string | null = null;
  private produtoId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      produto: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [null, [Validators.required, Validators.min(0)]],
      foto: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.produtoId = +id;
        this.carregarProdutoParaEdicao(this.produtoId);
      }
    });
  }

  carregarProdutoParaEdicao(id: number): void {
    this.produtoService.obterProdutoPorId(id).subscribe(produtoExistente => {
      this.formulario.patchValue(produtoExistente);
    });
  }

  salvarProduto(): void {
    if (this.formulario.invalid) {
      return;
    }
    const produtoParaSalvar = this.formulario.value;

    if (this.produtoId) {
      this.produtoService.atualizarProduto(this.produtoId, produtoParaSalvar).subscribe(() => {
        this.router.navigate(['/produtos']);
      });
    } else {
      this.produtoService.adicionarProduto(produtoParaSalvar).subscribe(() => {
        this.mensagem = 'Produto cadastrado com sucesso!';
        this.formulario.reset();
        setTimeout(() => this.mensagem = null, 3000);
      });
    }
  }

  get modoEdicao(): boolean {
    return this.produtoId !== null;
  }
}