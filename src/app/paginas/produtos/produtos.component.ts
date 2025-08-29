import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../servicos/produto.service'; // Verifique o caminho
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produtos.html',
  styleUrls: ['./produtos.css']
})
export class ProdutosComponent implements OnInit {
  public produtos: any[] = [];
  public mensagem: string | null = null;

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.produtoService.obterProdutos().subscribe(data => {
      this.produtos = data;
    });
  }

  excluirProduto(id: number): void {
    const confirmacao = window.prompt('Deseja realmente excluir este produto? Digite "sim" para confirmar.');
    if (confirmacao && confirmacao.toLowerCase() === 'sim') {
      this.produtoService.deletarProduto(id).subscribe({
        next: () => {
          this.mensagem = 'Produto excluído com sucesso!';
          this.listarProdutos();
          setTimeout(() => this.mensagem = null, 3000);
        },
        error: (err) => console.error('Erro ao excluir produto:', err)
      });
    }
  }

  editarProduto(id: number): void {
    // Navega para a página de cadastro, passando o ID do produto a ser editado
    this.router.navigate(['/cadastro', id]);
  }
}