import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ProdutosComponent } from './paginas/produtos/produtos.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';

// 2. Defina o "mapa" da sua aplicação aqui
export const routes: Routes = [
  // Quando o usuário acessar a página de início (ex: /inicio), mostre o InicioComponent
  { path: 'inicio', component: InicioComponent },

  // Quando o usuário acessar a página de produtos (ex: /produtos), mostre o ProdutosComponent
  { path: 'produtos', component: ProdutosComponent },

  // Quando o usuário acessar a página de cadastro (ex: /cadastro), mostre o CadastroComponent
  { path: 'cadastro', component: CadastroComponent },

  // Esta rota é para QUANDO VOCÊ FOR EDITAR um produto.
  // Ela usa o mesmo componente de cadastro, mas passa um 'id' na URL
  { path: 'cadastro/:id', component: CadastroComponent },

  // Rota padrão: se a URL estiver vazia, o usuário será redirecionado para /inicio
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },

  // Rota curinga: se o usuário digitar qualquer outra URL, ele será redirecionado para /inicio
  { path: '**', redirectTo: '/inicio' }
];