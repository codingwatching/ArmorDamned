//=============================================================================
// Yanfly Engine Plugins - Core Engine
// YEP_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_CoreEngine = true;

var Yanfly = Yanfly || {};
Yanfly.Core = Yanfly.Core || {};

//=============================================================================
/*:
 * @plugindesc v1.09 Necessário para a maioria dos Yanfly Engine Scripts.
 * Também contém consertos de bugs achados inerentemente no RMMV.
 * @author Yanfly Engine Plugins
 *
 * @param ---Screen---
 * @default
 *
 * @param Screen Width
 * @desc Ajusta a largura da tela.
 * Padrão: 816
 * @default 816
 *
 * @param Screen Height
 * @desc Ajusta a altura da tela.
 * Padrão: 624
 * @default 624
 *
 * @param Scale Battlebacks
 * @desc Voçê deseja que o plano de fundo da batalha caiba na tela?
 * NÃO - false     SIM - true
 * @default true
 *
 * @param Scale Title
 * @desc Voçê deseja que o plano de fundo do título caiba na tela?
 * NÃO - false     SIM - true
 * @default true
 *
 * @param Open Console
 * @desc Por fins de testar e debug,  isso abre o console.
 * Não abrir - false     Abrir - true
 * @default false
 *
 * @param Reposition Battlers
 * @desc Permitir o plugin para reposicionar os combatentes para resolução?
 * NÃO - false     SIM - true
 * @default true
 *
 * @param ---Gold---
 * @desc
 *
 * @param Gold Max
 * @desc A quantidade máxima de ouro que um personagem pode ter.
 * Padrão: 99999999
 * @default 99999999
 *
 * @param Gold Font Size
 * @desc O tamanho da fonte usada para mostrar o ouro.
 * Padrão: 28
 * @default 20
 *
 * @param Gold Icon
 * @desc Esse será o ícone usado para representar o ouro na gold window.
 * Se deixado no 0, nenhum ícone será mostrado.
 * @default 297
 *
 * @param Gold Overlap
 * @desc Isso será mostrado se o número do ouro exceder o tamanho da área de
 * conteúdo atribuído.
 * @default A lotta
 *
 * @param ---Items---
 * @desc
 *
 * @param Default Max
 * @desc Esse é o número máximo de itens que um personagem pode ter.
 * Padrão: 99
 * @default 99
 *
 * @param Quantity Text Size
 * @desc Esse é o tamanho da fonte de texto usado para a quantidade de item.
 * Padrão: 28
 * @default 20
 *
 * @param ---Stats---
 * @default
 *
 * @param Max Level
 * @desc Ajusta o limite máximo de level para os personagens.
 * Padrão: 99
 * @default 99
 *
 * @param Actor MaxHP
 * @desc Ajusta o limite máximo de HP para os personagens.
 * Padrão: 9999
 * @default 9999
 *
 * @param Actor MaxMP
 * @desc Ajusta o limite máximo de MP para os personagens.
 * Padrão: 9999
 * @default 9999
 *
 * @param Actor Parameter
 * @desc Ajusta o limite máximo do parâmetro para os personagens.
 * Padrão: 999
 * @default 999
 *
 * @param Enemy MaxHP
 * @desc Ajusta o limite máximo de HP para os inimigos.
 * Padrão: 999999
 * @default 999999
 *
 * @param Enemy MaxMP
 * @desc Ajusta o limite máximo de MP para os inimigos.
 * Padrão: 9999
 * @default 9999
 *
 * @param Enemy Parameter
 * @desc  Ajusta o limite máximo do parâmetro para os inimigos.
 * Padrão: 999
 * @default 999
 *
 * @param ---Battle---
 * @desc
 *
 * @param Animation Rate
 * @desc Ajusta o ritmo das animações na batalha. Menos pra mais rápido.
 * Padrão: 4
 * @default 4
 *
 * @param Flash Target
 * @desc Se um inimigo ser o alvo, ele pisca ou pode branquear.
 * DESLIGADO - false     LIGADO - true
 * @default false
 *
 * @param ---Font---
 * @desc
 *
 * @param Chinese Font
 * @desc Fonte(s) padrão(ões) usadas para o RPG Chinês.
 * Padrão: SimHei, Heiti TC, sans-serif
 * @default SimHei, Heiti TC, sans-serif
 *
 * @param Korean Font
 * @desc Fonte(s) padrão(ões) usadas para o RPG Coreano.
 * Padrão: Dotum, AppleGothic, sans-serif
 * @default Dotum, AppleGothic, sans-serif
 *
 * @param Default Font
 * @desc Fonte(s) padrão(ões) usadas para todo o resto.
 * Padrão: GameFont
 * @default GameFont, Verdana, Arial, Courier New
 *
 * @param Font Size
 * @desc Fonte de tamanho padrão usado para janelas.
 * Padrão: 28
 * @default 28
 *
 * @param Text Align
 * @desc Como alinhar o texto para janelas de comando.
 * left     center     right
 * @default left
 *
 * @param ---Windows---
 * @default
 *
 * @param Digit Grouping
 * @desc Ajunta dígitos com vírgula.
 * false - DESLIGADO     true - LIGADO
 * @default true
 *
 * @param Line Height
 * @desc Ajusta a altura de linha universal usada em Windows.
 * Padrão: 36
 * @default 36
 *
 * @param Icon Width
 * @desc Ajusta a largura de seus ícones.
 * Padrão: 32
 * @default 32
 *
 * @param Icon Height
 * @desc Ajusta a altura de seus ícones.
 * Padrão: 32
 * @default 32
 *
 * @param Face Width
 * @desc Ajusta a largura das faces dos personagens.
 * Padrão: 144
 * @default 144
 *
 * @param Face Height
 * @desc Ajusta a altura das faces dos personagens.
 * Padrão: 144
 * @default 144
 *
 * @param Window Padding
 * @desc Ajusta o preenchimento para todas as janelas padrões.
 * Padrão: 18
 * @default 18
 *
 * @param Text Padding
 * @desc Ajusta o preenchimento para textos dentro de janelas.
 * Padrão: 6
 * @default 6
 *
 * @param Window Opacity
 * @desc Ajusta a opacidade do plano de fundo das janelas.
 * Padrão: 192
 * @default 192
 *
 * @param Gauge Outline
 * @desc Habilitar esboços para medidores .
 * false - DESLIGADO     true - LIGADO
 * @default true
 *
 * @param Gauge Height
 * @desc Estabelece a altura de medidores.
 * Padrão: 6
 * @default 18
 *
 * @param Menu TP Bar
 * @desc Desenha uma barra TP no status menu para personagens.
 * false - DESLIGADO     true - LIGADO
 * @default true
 *
 * @param ---Window Colors---
 * @default
 *
 * @param Color: Normal
 * @desc Muda a cor de texto para Windows.
 * Padrão: 0
 * @default 0
 *
 * @param Color: System
 * @desc Muda a cor de texto para Windows.
 * Padrão: 16
 * @default 16
 *
 * @param Color: Crisis
 * @desc Muda a cor de texto para Windows.
 * Padrão: 17
 * @default 17
 *
 * @param Color: Death
 * @desc Muda a cor de texto para Windows.
 * Padrão: 18
 * @default 18
 *
 * @param Color: Gauge Back
 * @desc Muda a cor de texto para Windows.
 * Padrão: 19
 * @default 19
 *
 * @param Color: HP Gauge 1
 * @desc Muda a cor de texto para Windows.
 * Padrão: 20
 * @default 20
 *
 * @param Color: HP Gauge 2
 * @desc Muda a cor de texto para Windows.
 * Padrão: 21
 * @default 21
 *
 * @param Color: MP Gauge 1
 * @desc Muda a cor de texto para Windows.
 * Padrão: 22
 * @default 22
 *
 * @param Color: MP Gauge 2
 * @desc Muda a cor de texto para Windows.
 * Padrão: 23
 * @default 23
 *
 * @param Color: MP Cost
 * @desc Muda a cor de texto para Windows.
 * Padrão: 23
 * @default 23
 *
 * @param Color: Power Up
 * @desc Muda a cor de texto para Windows.
 * Padrão: 24
 * @default 24
 *
 * @param Color: Power Down
 * @desc Muda a cor de texto para Windows.
 * Padrão: 25
 * @default 25
 *
 * @param Color: TP Gauge 1
 * @desc Muda a cor de texto para Windows.
 * Padrão: 28
 * @default 28
 *
 * @param Color: TP Gauge 2
 * @desc Muda a cor de texto para Windows.
 * Padrão: 29
 * @default 29
 *
 * @param Color: TP Cost Color
 * @desc Muda a cor de texto para Windows.
 * Padrão: 29
 * @default 29
 *
 * @help
 * ============================================================================
 * Introdução e Instruções
 * ============================================================================
 *
 * Yanfly Engine Plugins - Core Engine é feito para RPG Maker MV.
 * Esse plugin tem como função, principalmente, consertar bugs e permitir o
 * usuário maior controle sobre as várias características do RPG MAKER MV,
 * como a resolução da tela, fontes, cores da janela, e mais.
 *
 * Apenas ponha isso no topo de todos os outros Yanfly Engine Plugins.
 * Ajuste qualquer parâmetro que achar melhor.
 *
 * ============================================================================
 * Conserto de Bugs
 * ============================================================================
 *
 * Esse plugin conserta alguns bugs encontrados dentro do RPG MAKER MV.
 * Alguns deles são os seguintes:
 *
 * Cobrimento de Animação
 * Quando uma habilidade/item que tem como alvo múltiplos inimigos de uma vez
 * é usada com animação em tela cheia, ela cobre múltiplas vezes causando com
 * que a imagem pareca distorcida por uma série de efeitos cobridores. Esse
 * plugin conserta esse problema por ter apenas uma animação sendo executada
 * sobre o grupo em vez de cada uma.
 *
 * Evento de Velocidade de Movimento
 * A velocidade de movimento de eventos é levemente mais devagar do que deveria
 * ser graças a um pequeno erro no código fonte. O plugin conserta esse
 * problema e eles se movimentam na velocidade correta.
 *
 * Evento de Fila de Movimento
 * Se um evento fosse mover através de um evento de comando, mudar uma condição
 * que estabelecesse o evento a mudar para uma página diferente causaria que a
 * rota de movimento do evento parasse. O plugin conserta esse problema e a
 * rota de movimento do evento irá até o final.
 *
 * Evento de Colisão
 * Eventos não podem mover acima de outros eventos com uma configuração Below
 * Player. Isso faz com que seja difícil para certos tipos de eventos
 * existirem. O plugin conserta o problema por fazer o cheque de colisão apenas
 * se aplicar para eventos com prioridade “Same as Characters”. Qualquer
 * evento que esteja acima ou abaixo dos personagens não irá mais colidir com
 * outros eventos.
 *
 * Lacrimejamento de Tela
 * Quando movendo devagar, as telhas na tela lacrimejam. Enquanto não é
 * perceptível em todos os sistemas, computadores mais devagares
 * definitivamente iram mostrá-los. O plugin conserta esse problema e
 * sincroniza as telhas para ficarem corretamente em ritmo com o movimento da
 * câmera da tela.
 *
 * ============================================================================
 * Ouro
 * ============================================================================
 *
 * Você pode usar os comandos do plugin para adicionar ou remover ouro mais do
 * que o limite do editor, que é 9,999,999. Você também pode por tags de notas
 * em itens, armas, e armaduras para acima do limite de custo 999,999.
 *
 * Comandos do plugin:
 *   GainGold 1234567890       # Party ganha 1234567890 de ouro.
 *   LoseGold 9876543210       # Party perde 9876543210 de ouro.
 *
 * Tags de item, arma, e armadura
 *   <Price: x>
 * Muda o preço do item para x. Esse tag permite que você ignore o limite de
 * custo de ouro do editor, que é 999,999.
 *
 * Tag inimiga
 *   <Gold: x>
 * Muda o valor do ouro do inimigo para x. Esté tag permite que você ignore o
 * limite de ouro do inimigo do editor, que é 9,999,999.
 *
 * ============================================================================
 * Itens
 * ============================================================================
 *
 * Muda os parâmetros para refletir o número máximo de itens que um jogador
 * por segurar por item. Se você quiser fazer com que itens individuais tenham
 * valores máximos diferentes, use o seguinte tag:
 *
 * Tag de item, arma, e armadura:
 *   <Max Item: x>
 * Isso muda a quantidade máxima do item para x.
 *
 * ============================================================================
 * Status
 * ============================================================================
 *
 * Mesmo com os limites de parâmetros aumentados, o editor ainda é confinado
 * para os limites padrões do RPG MAKER MV. Para passar por eles, use os
 * seguintes tags para permitir mais controle sobre os aspectos individuais
 * para os parâmetros.
 *
 * Tag do Personagem
 *   <Initial Level: x>
 *   Muda o level inicial do personagem para x. Isso permite que você ignore o
 *   limite de level do editor, que é 99.
 *
 *   <Max Level: x>
 *   Muda o level máximo do personagem para x.  Isso permite que você ignore o
 *   limite de level do editor, que é 99.
 *
 * Tag de Aprender Habilidade de Classe
 *   <Learn at Level: x>
 *   Quando colocada dentro de uma tag de classe “Habilidades para Aprender”,
 *   isso causará que a classe para aprender a habilidade seja no level x.
 *
 * Tags de Arma e Armadura
 *   <stat: +x>
 *   <stat: -x>
 *   Permite o pedaço de arma ou armadura a ganhar ou perder x quantidade de
 *   status. Substitua “stat” por "hp", "mp", "atk", "def", "mat", "mdf",
 *   "agi", ou “luk” para alterar o status específico. Isso permite o pedaço
 *   de equipamento a ir além da limitação padrão do editor apenas enquanto o
 *   limite máximo o permita.
 *
 * Tags inimiga
 *   <stat: x>
 *   Isso muda o status do inimigo para quantidade x. Substitua “stat” por
 *   “hp”, "mp", "atk", "def", "mat", "mdf", "agi", ou "luk" para alterar
 *   o status específico. Isso permite o pedaço de equipamento a ir além da
 *   limitação padrão do editor.
 *
 *   <exp: x>
 *   Isso muda a exp do inimigo dada para quantidade x. Isso permite que o
 *   inimigo dê mais exp que o limite padrão do editor, que é 9,999,999.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.09:
 * - Fixed a bug within the MV Source revolving monitor refresh rates making
 * games run too fast.
 * - Changed minimum display width for status drawing to accomodate Party
 * Formation defaults.
 *
 * Version 1.08:
 * - Fixed a bug within the MV Source with changing classes and maintaining
 * levels, even though the feature to maintain the levels has been removed.
 *
 * Version 1.07:
 * - Fixed an issue with the gauges drawing outlines thicker than normal at odd
 * intervals when windows are scaled irregularly.
 *
 * Version 1.06:
 * - Removed event frequency bug fix since it's now included in the source.
 *
 * Version 1.05:
 * - Added 'Scale Game Over' parameter to plugin settings.
 *
 * Version 1.04:
 * - Reworked math for calculating scaled battleback locations.
 * - Fixed a bug where if the party failed to escape from battle, states that
 * would be removed by battle still get removed. *Fixed by Emjenoeg*
 *
 * Version 1.03:
 * - Fixed a strange bug that made scaled battlebacks shift after one battle.
 *
 * Version 1.02:
 * - Fixed a bug that made screen fading on mobile devices work incorrectly.
 * - Added 'Scale Battlebacks' and 'Scale Title' parameters.
 *
 * Version 1.01:
 * - Fixed a bug that where if button sprites had different anchors, they would
 * not be properly clickable. *Fixed by Zalerinian*
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_CoreEngine');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.ScaleBattleback = String(Yanfly.Parameters['Scale Battlebacks']);
Yanfly.Param.ScaleTitle = String(Yanfly.Parameters['Scale Title']);
Yanfly.Param.ScaleGameOver = String(Yanfly.Parameters['Scale Game Over']);
Yanfly.Param.OpenConsole = String(Yanfly.Parameters['Open Console']);
Yanfly.Param.DigitGroup = String(Yanfly.Parameters['Digit Grouping']);
Yanfly.Param.MaxItem = Number(Yanfly.Parameters['Default Max']);
Yanfly.Param.MaxLevel = Number(Yanfly.Parameters['Max Level']);
Yanfly.Param.AnimationRate = Number(Yanfly.Parameters['Animation Rate']);
Yanfly.Param.FlashTarget = String(Yanfly.Parameters['Flash Target']);
Yanfly.Param.ReposBattlers = String(Yanfly.Parameters['Reposition Battlers']);
Yanfly.Param.EnemyMaxHp = Number(Yanfly.Parameters['Enemy MaxHP']);
Yanfly.Param.EnemyMaxMp = Number(Yanfly.Parameters['Enemy MaxMP']);
Yanfly.Param.EnemyParam = Number(Yanfly.Parameters['Enemy Parameter']);
Yanfly.Param.ActorMaxHp = Number(Yanfly.Parameters['Actor MaxHP']);
Yanfly.Param.ActorMaxMp = Number(Yanfly.Parameters['Actor MaxMP']);
Yanfly.Param.ActorParam = Number(Yanfly.Parameters['Actor Parameter']);
Yanfly.Param.MaxGold = String(Yanfly.Parameters['Gold Max']);
Yanfly.Param.ChineseFont = String(Yanfly.Parameters['Chinese Font']);
Yanfly.Param.KoreanFont = String(Yanfly.Parameters['Korean Font']);
Yanfly.Param.DefaultFont = String(Yanfly.Parameters['Default Font']);
Yanfly.Param.FontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.TextAlign = String(Yanfly.Parameters['Text Align']);
Yanfly.Param.LineHeight = Number(Yanfly.Parameters['Line Height']);
Yanfly.Param.GaugeOutline = String(Yanfly.Parameters['Gauge Outline']);
Yanfly.Param.GaugeHeight = Number(Yanfly.Parameters['Gauge Height']);
Yanfly.Param.WindowPadding = Number(Yanfly.Parameters['Window Padding']);
Yanfly.Param.TextPadding = Number(Yanfly.Parameters['Text Padding']);
Yanfly.Param.WindowOpacity = Number(Yanfly.Parameters['Window Opacity']);
Yanfly.Param.MenuTpGauge = String(Yanfly.Parameters['Menu TP Bar']);
Yanfly.Param.ColorNormal = Number(Yanfly.Parameters['Color: Normal']);
Yanfly.Param.ColorSystem = Number(Yanfly.Parameters['Color: System']);
Yanfly.Param.ColorCrisis = Number(Yanfly.Parameters['Color: Crisis']);
Yanfly.Param.ColorDeath = Number(Yanfly.Parameters['Color: Death']);
Yanfly.Param.ColorGaugeBack = Number(Yanfly.Parameters['Color: Gauge Back']);
Yanfly.Param.ColorHpGauge1 = Number(Yanfly.Parameters['Color: HP Gauge 1']);
Yanfly.Param.ColorHpGauge2 = Number(Yanfly.Parameters['Color: HP Gauge 2']);
Yanfly.Param.ColorMpGauge1 = Number(Yanfly.Parameters['Color: MP Gauge 1']);
Yanfly.Param.ColorMpGauge2 = Number(Yanfly.Parameters['Color: MP Gauge 2']);
Yanfly.Param.ColorMpCost = Number(Yanfly.Parameters['Color: MP Cost']);
Yanfly.Param.ColorPowerUp = Number(Yanfly.Parameters['Color: Power Up']);
Yanfly.Param.ColorPowerDown = Number(Yanfly.Parameters['Color: Power Down']);
Yanfly.Param.ColorTpGauge1 = Number(Yanfly.Parameters['Color: TP Gauge 1']);
Yanfly.Param.ColorTpGauge2 = Number(Yanfly.Parameters['Color: TP Gauge 2']);
Yanfly.Param.ColorTpCost = Number(Yanfly.Parameters['Color: TP Cost Color']);
Yanfly.Param.GoldFontSize = String(Yanfly.Parameters['Gold Font Size']);
Yanfly.Icon.Gold = Number(Yanfly.Parameters['Gold Icon']);
Yanfly.Param.GoldOverlap = String(Yanfly.Parameters['Gold Overlap']);
Yanfly.Param.ItemQuantitySize = Number(Yanfly.Parameters['Quantity Text Size']);

//=============================================================================
// Bitmap
//=============================================================================

Yanfly.Core.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
  Yanfly.Core.Bitmap_initialize.call(this, width, height);
  this.fontFace = Yanfly.Param.DefaultFont;
};

//=============================================================================
// Sprite
//=============================================================================

Yanfly.Core.Sprite_updateTransform = Sprite.prototype.updateTransform;
Sprite.prototype.updateTransform = function() {
  Yanfly.Core.Sprite_updateTransform.call(this);
  this.worldTransform.tx = Math.floor(this.worldTransform.tx);
  this.worldTransform.ty = Math.floor(this.worldTransform.ty);
};

//=============================================================================
// ScreenSprite
//=============================================================================

Yanfly.Core.ScreenSprite_initialize = ScreenSprite.prototype.initialize;
ScreenSprite.prototype.initialize = function() {
    Yanfly.Core.ScreenSprite_initialize.call(this);
    this.scale.x = Graphics.boxWidth * 10;
    this.scale.y = Graphics.boxHeight * 10;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.x = 0;
    this.y = 0;
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Core.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.Core.DataManager_isDatabaseLoaded.call(this)) return false;
    this.processCORENotetags1($dataItems);
    this.processCORENotetags1($dataWeapons);
    this.processCORENotetags1($dataArmors);
    this.processCORENotetags2($dataEnemies);
    this.processCORENotetags3($dataActors);
    this.processCORENotetags4($dataClasses);
    return true;
};

DataManager.processCORENotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.maxItem = Yanfly.Param.MaxItem;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:PRICE):[ ](\d+)>/i)) {
        obj.price = parseInt(RegExp.$1);
      } else if (line.match(/<(?:MAX ITEM):[ ](\d+)>/i)) {
        obj.maxItem = Math.max(1, parseInt(RegExp.$1));
      } else if (line.match(/<(.*):[ ]([\+\-]\d+)>/i)) {
        var stat = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        switch (stat) {
          case 'HP':
          case 'MAXHP':
          case 'MAX HP':
            obj.params[0] = value;
            break;
          case 'MP':
          case 'MAXMP':
          case 'MAX MP':
          case 'SP':
          case 'MAXSP':
          case 'MAX SP':
            obj.params[1] = value;
            break;
          case 'ATK':
          case 'STR':
            obj.params[2] = value;
            break;
          case 'DEF':
            obj.params[3] = value;
            break;
          case 'MAT':
          case 'INT' || 'SPI':
            obj.params[4] = value;
            break;
          case 'MDF':
          case 'RES':
            obj.params[5] = value;
            break;
          case 'AGI':
          case 'SPD':
            obj.params[6] = value;
            break;
          case 'LUK':
            obj.params[7] = value;
            break;
          case 'EXP':
          case 'XP':
            obj.exp = value;
            break;
        }
      }
    }
  }
};

DataManager.processCORENotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:GOLD):[ ](\d+)>/i)) {
        obj.gold = parseInt(RegExp.$1);
      } else if (line.match(/<(.*):[ ](\d+)>/i)) {
        var stat = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        switch (stat) {
          case 'HP':
          case 'MAXHP':
          case 'MAX HP':
            obj.params[0] = value;
            break;
          case 'MP':
          case 'MAXMP':
          case 'MAX MP':
          case 'SP':
          case 'MAXSP':
          case 'MAX SP':
            obj.params[1] = value;
            break;
          case 'ATK':
          case 'STR':
            obj.params[2] = value;
            break;
          case 'DEF':
            obj.params[3] = value;
            break;
          case 'MAT':
          case 'INT':
          case 'SPI':
            obj.params[4] = value;
            break;
          case 'MDF':
          case 'RES':
            obj.params[5] = value;
            break;
          case 'AGI':
          case 'SPD':
            obj.params[6] = value;
            break;
          case 'LUK':
            obj.params[7] = value;
            break;
        }
      }
    }
  }
};

DataManager.processCORENotetags3 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.maxLevel = Yanfly.Param.MaxLevel;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:MAX LEVEL):[ ](\d+)>/i)) {
        obj.maxLevel = parseInt(RegExp.$1);
        if (obj.maxLevel < 1) obj.maxLevel = 1;
      } else if (line.match(/<(?:INITIAL LEVEL):[ ](\d+)>/i)) {
        obj.initialLevel = parseInt(RegExp.$1);
        if (obj.initialLevel < 1) obj.initialLevel = 1;
      }
    }
  }
};

DataManager.processCORENotetags4 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.learnings.forEach(function(learning) {
      if (learning.note.match(/<(?:LEARN LEVEL):[ ](\d+)>/i)) {
        learning.level = parseInt(RegExp.$1);
        if (learning.level < 1) obj.maxLevel = 1;
      }
    }, this);
  }
};

//=============================================================================
// Scene_Manager
//=============================================================================

SceneManager._screenWidth  = Number(Yanfly.Parameters['Screen Width'] || 816);
SceneManager._screenHeight = Number(Yanfly.Parameters['Screen Height'] || 624);
SceneManager._boxWidth     = Number(Yanfly.Parameters['Screen Width'] || 816);
SceneManager._boxHeight    = Number(Yanfly.Parameters['Screen Height'] || 624);

Yanfly.Core.SceneManager_run = SceneManager.run;
SceneManager.run = function(sceneClass) {
    Yanfly.Core.SceneManager_run.call(this, sceneClass);
    if (Utils.isMobileDevice()) return;
    if (Utils.isMobileSafari()) return;
    if (Utils.isAndroidChrome()) return;
    var resizeWidth = Graphics.boxWidth - window.innerWidth;
    var resizeHeight = Graphics.boxHeight - window.innerHeight;
    if (eval(Yanfly.Param.OpenConsole)) this.openConsole();
    if (!Imported.ScreenResolution) {
      window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
      window.resizeBy(resizeWidth, resizeHeight);
    }
};

Yanfly.Core.SceneManager_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
    this.initSynchronizeFrames();
    Yanfly.Core.SceneManager_initialize.call(this);
};

SceneManager.initSynchronizeFrames = function() {
    this._currentFrame = 0;
    this._frameFrequency = 1 / 60;
    this._currentMs = performance.now();
    this._synchedMs = 0;
};

SceneManager.openConsole = function() {
    if (Utils.isNwjs() && Utils.isOptionValid('test')) {
      var _debugWindow = require('nw.gui').Window.get().showDevTools();
      _debugWindow.moveTo(0, 0);
      window.focus();
    }
};

SceneManager.update = function() {
    try {
      this.tickStart();
      this.updateMain();
      this.tickEnd();
    } catch (e) {
      this.catchException(e);
    }
};

SceneManager.updateMain = function() {
    while (this.isSynchronizingFrames()) {
      this.updateInputData();
      this.changeScene();
      this.updateScene();
      this.synchronizeFrames();
    }
    this.renderScene();
    this.requestUpdate();
};

SceneManager.isSynchronizingFrames = function() {
    var newTime = performance.now();
    var frameTime = Math.min((newTime - this._currentMs) / 1000, 1 / 60);
    this._currentMs = newTime;
    this._synchedMs += frameTime;
    return this._synchedMs >= this._frameFrequency;
};

SceneManager.synchronizeFrames = function() {
    this._synchedMs -= this._frameFrequency;
    this._currentFrame += this._frameFrequency;
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Core.BattleManager_displayStartMessages =
    BattleManager.displayStartMessages;
BattleManager.displayStartMessages = function() {
  Yanfly.Core.BattleManager_displayStartMessages.call(this);
  $gameTroop.members().forEach(function(enemy) {
      enemy.recoverAll();
  });
};

BattleManager.processEscape = function() {
    $gameParty.performEscape();
    SoundManager.playEscape();
    var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
    if (success) {
        $gameParty.removeBattleStates();
        this.displayEscapeSuccessMessage();
        this._escaped = true;
        this.processAbort();
    } else {
        this.displayEscapeFailureMessage();
        this._escapeRatio += 0.1;
        $gameParty.clearActions();
        this.startTurn();
    }
    return success;
};

//=============================================================================
// Scene_Title
//=============================================================================

Yanfly.Core.Scene_Title_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function() {
    Yanfly.Core.Scene_Title_start.call(this);
    if (eval(Yanfly.Param.ScaleTitle)) this.rescaleTitle();
};

Scene_Title.prototype.rescaleTitle = function() {
    this.rescaleTitleSprite(this._backSprite1);
    this.rescaleTitleSprite(this._backSprite2);
};

Scene_Title.prototype.rescaleTitleSprite = function(sprite) {
    if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) return;
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var ratioX = width / sprite.bitmap.width;
    var ratioY = height / sprite.bitmap.height;
    if (ratioX > 1.0) sprite.scale.x = ratioX;
    if (ratioY > 1.0) sprite.scale.y = ratioY;
    this.centerSprite(sprite);
};

//=============================================================================
// Scene_Gameover
//=============================================================================

Yanfly.Core.Scene_Gameover_start = Scene_Gameover.prototype.start;
Scene_Gameover.prototype.start = function() {
    Yanfly.Core.Scene_Gameover_start.call(this);
    if (eval(Yanfly.Param.ScaleGameOver)) this.rescaleBackground();
};

Scene_Gameover.prototype.rescaleBackground = function() {
    this.rescaleImageSprite(this._backSprite);
};

Scene_Gameover.prototype.rescaleImageSprite = function(sprite) {
    if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) return;
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var ratioX = width / sprite.bitmap.width;
    var ratioY = height / sprite.bitmap.height;
    if (ratioX > 1.0) sprite.scale.x = ratioX;
    if (ratioY > 1.0) sprite.scale.y = ratioY;
    this.centerSprite(sprite);
};

Scene_Gameover.prototype.centerSprite = function(sprite) {
    sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

//=============================================================================
// Sprite_Animation
//=============================================================================

Sprite_Animation.prototype.setupRate = function() {
  this._rate = Yanfly.Param.AnimationRate;
};

//=============================================================================
// Sprite_Battler
//=============================================================================

if (!eval(Yanfly.Param.FlashTarget)) {

Yanfly.Core.Sprite_Battler_updateSelectionEffect =
    Sprite_Battler.prototype.updateSelectionEffect;
Sprite_Battler.prototype.updateSelectionEffect = function() {
    if (this._battler.isActor()) {
      Yanfly.Core.Sprite_Battler_updateSelectionEffect.call(this);
    } else {
      if (this._battler.isSelected()) this.startEffect('whiten');
    }
};

};

//=============================================================================
// Sprite_Actor
//=============================================================================

if (eval(Yanfly.Param.ReposBattlers)) {
  Yanfly.Core.Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
  Sprite_Actor.prototype.setActorHome = function(index) {
      Yanfly.Core.Sprite_Actor_setActorHome.call(this, index);
      this._homeX += Graphics.boxWidth - 816;
      this._homeY += Graphics.boxHeight - 624;
  };
};

//=============================================================================
// Sprite_Enemy
//=============================================================================

if (eval(Yanfly.Param.ReposBattlers)) {
  Yanfly.Core.Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function(battler) {
      Yanfly.Core.Sprite_Enemy_setBattler.call(this, battler);
      this._homeY += Graphics.boxHeight - 624;
      if ($gameSystem.isSideView()) return;
      this._homeX += (Graphics.boxWidth - 816) / 2;
  };
};

//=============================================================================
// Sprite_StateIcon
//=============================================================================

Sprite_StateIcon._iconWidth  = Number(Yanfly.Parameters['Icon Width'] || 32);
Sprite_StateIcon._iconHeight = Number(Yanfly.Parameters['Icon Height'] || 32);

//=============================================================================
// Sprite_Button
//=============================================================================

Sprite_Button.prototype.isButtonTouched = function() {
    var x = this.canvasToLocalX(TouchInput.x) + (this.anchor.x * this.width);
    var y = this.canvasToLocalY(TouchInput.y) + (this.anchor.y * this.height);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

if (eval(Yanfly.Param.ScaleBattleback)) {

Yanfly.Core.Spriteset_Battle_locateBattleback =
    Spriteset_Battle.prototype.locateBattleback;
Spriteset_Battle.prototype.locateBattleback = function() {
    var sprite1 = this._back1Sprite;
    var sprite2 = this._back2Sprite;
    if (sprite1.bitmap.width <= 0) return;
    if (sprite2.bitmap.width <= 0) return;
    if (this._rescaledBattlebackSprite) return;
    this._rescaledBattlebackSprite = true;
    Yanfly.Core.Spriteset_Battle_locateBattleback.call(this);
    this.rescaleBattlebacks();
};

Spriteset_Battle.prototype.rescaleBattlebacks = function() {
    this.rescaleBattlebackSprite(this._back1Sprite);
    this.rescaleBattlebackSprite(this._back2Sprite);
};

Spriteset_Battle.prototype.rescaleBattlebackSprite = function(sprite) {
  if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) return;
  var width = Graphics.boxWidth;
  var height = Graphics.boxHeight;
  var ratioX = width / sprite.bitmap.width;
  var ratioY = height / sprite.bitmap.height;
  if (ratioX > 1.0) {
    sprite.scale.x = ratioX;
    sprite.anchor.x = 0.5;
    sprite.x = width / 2;
  }
  if (ratioY > 1.0) {
    sprite.scale.y = ratioY;
    sprite.origin.y = 0;
    sprite.y = 0;
  }
};

}; // Yanfly.Param.ScaleBattleback

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.paramMax = function(paramId) {
    if (paramId === 0) {
        return Yanfly.Param.EnemyMaxHp;
    } else if (paramId === 1) {
        return Yanfly.Param.EnemyMaxMp;
    } else {
        return Yanfly.Param.EnemyParam;
    }
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.Core.Game_Actor_isMaxLevel = Game_Actor.prototype.isMaxLevel;
Game_Actor.prototype.isMaxLevel = function() {
    if (this.maxLevel() === 0) return false;
    return Yanfly.Core.Game_Actor_isMaxLevel.call(this);
};

Game_Actor.prototype.paramMax = function(paramId) {
  if (paramId === 0) {
      return Yanfly.Param.ActorMaxHp;
  } else if (paramId === 1) {
      return Yanfly.Param.ActorMaxMp;
  } else {
      return Yanfly.Param.ActorParam;
  }
};

Yanfly.Core.Game_Actor_paramBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
    if (this.level > 99) {
      var i = this.currentClass().params[paramId][99];
      var j = this.currentClass().params[paramId][98];
      i += (i - j) * (this.level - 99);
      return i;
    }
    return Yanfly.Core.Game_Actor_paramBase.call(this, paramId);
};

Game_Actor.prototype.changeClass = function(classId, keepExp) {
	var exp = this.currentExp();
    this._classId = classId;
    this.changeExp(exp, false);
    this.refresh();
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.maxGold = function() {
    return eval(Yanfly.Param.MaxGold);
};

Game_Party.prototype.maxItems = function(item) {
    if (!item) return 1;
    return item.maxItem;
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.displayX = function() {
    return parseFloat(Math.floor(this._displayX *
      this.tileWidth())) / this.tileWidth();
};

Game_Map.prototype.displayY = function() {
    return parseFloat(Math.floor(this._displayY *
      this.tileHeight())) / this.tileHeight();
};

Game_Map.prototype.adjustX = function(x) {
    if (this.isLoopHorizontal() && x < this.displayX() -
            (this.width() - this.screenTileX()) / 2) {
        return x - this.displayX() + $dataMap.width;
    } else {
        return x - this.displayX();
    }
};

Game_Map.prototype.adjustY = function(y) {
    if (this.isLoopVertical() && y < this.displayY() -
            (this.height() - this.screenTileY()) / 2) {
        return y - this.displayY() + $dataMap.height;
    } else {
        return y - this.displayY();
    }
};

//=============================================================================
// Game_Character
//=============================================================================

Game_Character.prototype.queueMoveRoute = function(moveRoute) {
    this._originalMoveRoute = moveRoute;
    this._originalMoveRouteIndex = 0;
};

Yanfly.Core.Game_Event_setMoveRoute =
    Game_Event.prototype.setMoveRoute;
Game_Character.prototype.setMoveRoute = function(moveRoute) {
    if (!this._moveRouteForcing) {
        Yanfly.Core.Game_Event_setMoveRoute.call(this, moveRoute);
    } else {
        this.queueMoveRoute(moveRoute);
    }
};

//=============================================================================
// Game_Event
//=============================================================================

Game_Event.prototype.isCollidedWithEvents = function(x, y) {
  var events = $gameMap.eventsXyNt(x, y).filter(function(ev) {
    return ev.isNormalPriority();
  });
  if (events.length <= 0) return false;
  return this.isNormalPriority();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Core.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Core.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'GainGold') {
        $gameParty.gainGold(parseInt(args[0]));
    }
    if (command === 'LoseGold') {
        $gameParty.loseGold(parseInt(args[0]));
    }
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base._iconWidth   = Number(Yanfly.Parameters['Icon Width'] || 32);
Window_Base._iconHeight  = Number(Yanfly.Parameters['Icon Height'] || 32);
Window_Base._faceWidth   = Number(Yanfly.Parameters['Face Width'] || 144);
Window_Base._faceHeight  = Number(Yanfly.Parameters['Face Height'] || 144);

Window_Base.prototype.lineHeight = function() {
  return Yanfly.Param.LineHeight;
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_Base.prototype.standardFontFace = function() {
    if ($gameSystem.isChinese()) {
    return Yanfly.Param.ChineseFont;
    } else if ($gameSystem.isKorean()) {
    return Yanfly.Param.KoreanFont;
    } else {
    return Yanfly.Param.DefaultFont;
    }
};

Window_Base.prototype.standardFontSize = function() {
    return Yanfly.Param.FontSize;
};

Window_Base.prototype.standardPadding = function() {
    return Yanfly.Param.WindowPadding;
};

Window_Base.prototype.textPadding = function() {
    return Yanfly.Param.TextPadding;
};

Window_Base.prototype.standardBackOpacity = function() {
    return Yanfly.Param.WindowOpacity;
};

Window_Base.prototype.normalColor = function() {
  return this.textColor(Yanfly.Param.ColorNormal);
};
Window_Base.prototype.systemColor = function() {
    return this.textColor(Yanfly.Param.ColorSystem);
};

Window_Base.prototype.crisisColor = function() {
    return this.textColor(Yanfly.Param.ColorCrisis);
};

Window_Base.prototype.deathColor = function() {
    return this.textColor(Yanfly.Param.ColorDeath);
};

Window_Base.prototype.gaugeBackColor = function() {
    return this.textColor(Yanfly.Param.ColorGaugeBack);
};

Window_Base.prototype.hpGaugeColor1 = function() {
    return this.textColor(Yanfly.Param.ColorHpGauge1);
};

Window_Base.prototype.hpGaugeColor2 = function() {
    return this.textColor(Yanfly.Param.ColorHpGauge2);
};

Window_Base.prototype.mpGaugeColor1 = function() {
    return this.textColor(Yanfly.Param.ColorMpGauge1);
};

Window_Base.prototype.mpGaugeColor2 = function() {
    return this.textColor(Yanfly.Param.ColorMpGauge2);
};

Window_Base.prototype.mpCostColor = function() {
    return this.textColor(Yanfly.Param.ColorMpCost);
};

Window_Base.prototype.powerUpColor = function() {
    return this.textColor(Yanfly.Param.ColorPowerUp);
};

Window_Base.prototype.powerDownColor = function() {
    return this.textColor(Yanfly.Param.ColorPowerDown);
};

Window_Base.prototype.tpGaugeColor1 = function() {
    return this.textColor(Yanfly.Param.ColorTpGauge1);
};

Window_Base.prototype.tpGaugeColor2 = function() {
    return this.textColor(Yanfly.Param.ColorTpGauge2);
};

Window_Base.prototype.tpCostColor = function() {
    return this.textColor(Yanfly.Param.ColorTpCost);
};

Window_Base.prototype.drawGauge = function(dx, dy, dw, rate, color1, color2) {
  var color3 = this.gaugeBackColor();
  var fillW = Math.floor(dw * rate).clamp(0, dw);
  var gaugeH = this.gaugeHeight();
  var gaugeY = dy + this.lineHeight() - gaugeH - 2;
  if (eval(Yanfly.Param.GaugeOutline)) {
    color3.paintOpacity = this.translucentOpacity();
    this.contents.fillRect(dx, gaugeY - 1, dw, gaugeH, color3);
    fillW = Math.max(fillW - 2, 0);
    gaugeH -= 2;
    dx += 1;
  } else {
    var fillW = Math.floor(dw * rate);
    var gaugeY = dy + this.lineHeight() - gaugeH - 2;
    this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
  }
    this.contents.gradientFillRect(dx, gaugeY, fillW, gaugeH, color1, color2);
};

Window_Base.prototype.gaugeHeight = function() {
    return Yanfly.Param.GaugeHeight;
};

Window_Base.prototype.drawActorLevel = function(actor, x, y) {
    this.changeTextColor(this.systemColor());
    var dw1 = this.textWidth(TextManager.levelA);
    this.drawText(TextManager.levelA, x, y, dw1);
    this.resetTextColor();
    var level = Yanfly.Util.toGroup(actor.level);
    var dw2 = this.textWidth(Yanfly.Util.toGroup(actor.maxLevel()));
    this.drawText(level, x + dw1, y, dw2, 'right');
};

Window_Base.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth(Yanfly.Util.toGroup(max));
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
    if (x3 >= x + labelWidth) {
        this.changeTextColor(color1);
        this.drawText(Yanfly.Util.toGroup(current), x3, y, valueWidth,
          'right');
        this.changeTextColor(color2);
        this.drawText('/', x2, y, slashWidth, 'right');
        this.drawText(Yanfly.Util.toGroup(max), x1, y, valueWidth, 'right');
    } else {
        this.changeTextColor(color1);
        this.drawText(Yanfly.Util.toGroup(current), x1, y, valueWidth,
          'right');
    }
};

Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    width = width || 96;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
	this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
	this.changeTextColor(this.systemColor());
	if (actor.isActor() && actor.index() == 0) {
		this.drawText($wolfzqPlayer.getPN('obscene'), x, y, 100);
		this.changeTextColor(this.tpColor(actor));
		this.drawText(Yanfly.Util.toGroup($wolfzqPlayer.getP('obscene')), x + width - 64, y, 64,
		  'right');
	} else {
		this.drawText(TextManager.tpA, x, y, 44);
		this.changeTextColor(this.tpColor(actor));
		this.drawText(Yanfly.Util.toGroup(actor.tp), x + width - 64, y, 64,
		  'right');
	}

};

Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var xpad = Window_Base._faceWidth + (2 * Yanfly.Param.TextPadding);
    var x2 = x + xpad;
    var width2 = Math.max(180, width - xpad - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2, y, 148);
	if (actor.actorId() == 1) {
		this.drawParamsText($w.getJob($gameVariables.value(15)), x2 + 154, y, 148, this.textColor(4));
		this.drawParamsText($w.getSexJob($w.getNum('sexJob')), x2 + 154 * 2, y, 148, this.textColor(5));
		if ($gameVariables.value(1) == 0) {
			this.drawParamsText($w.getT('p7'), x2 + 154 * 3, y, 64, this.textColor(6));
		} else {
			this.drawParamsText($w.getT('p16'), x2 + 154 * 3, y, 64, this.textColor(27));
		}
	}
    this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
    this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
    if (eval(Yanfly.Param.MenuTpGauge)) {
      this.drawActorTp(actor, x2, y + lineHeight * 3, width2);
    }
};

Window_Base.prototype.drawCurrencyValue = function(value, unit, wx, wy, ww) {
    this.resetTextColor();
    this.contents.fontSize = Yanfly.Param.GoldFontSize;
    if (this.usingGoldIcon(unit)) {
      var cx = Window_Base._iconWidth;
    } else {
      var cx = this.textWidth(unit);
    }
    var text = Yanfly.Util.toGroup(value);
    if (this.textWidth(text) > ww - cx) {
      text = Yanfly.Param.GoldOverlap;
    }
    this.drawText(text, wx, wy, ww - cx - 4, 'right');
    if (this.usingGoldIcon(unit)) {
      this.drawIcon(Yanfly.Icon.Gold, wx + ww - Window_Base._iconWidth, wy + 2);
    } else {
      this.changeTextColor(this.systemColor());
      this.drawText(unit, wx, wy, ww, 'right');
    }
    this.resetFontSettings();
};

Window_Base.prototype.usingGoldIcon = function(unit) {
    if (unit !== TextManager.currencyUnit) return false;
    return Yanfly.Icon.Gold > 0;
};

Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = this.lineHeight();
        var padding = (iconBoxWidth - Window_Base._iconWidth) / 2;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + padding, y + padding);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};

//=============================================================================
// Window_Command
//=============================================================================

Window_Command.prototype.itemTextAlign = function() {
    return Yanfly.Param.TextAlign;
};

//=============================================================================
// Window_MenuStatus
//=============================================================================

Window_MenuStatus.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var xpad = Yanfly.Param.WindowPadding + Window_Base._faceWidth;
    var x = rect.x + xpad;
    if (!eval(Yanfly.Param.MenuTpGauge)) {
      var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    } else {
      var y = rect.y;
    }
    var width = rect.width - x - this.textPadding();
    this.drawActorSimpleStatus(actor, x, y, width);
};

//=============================================================================
// Window_ItemList
//=============================================================================

Window_ItemList.prototype.numberWidth = function() {
    return this.textWidth('\u00d70,000');
};

Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    if (!this.needsNumber()) return;
    var numItems = Yanfly.Util.toGroup($gameParty.numItems(item));
    this.contents.fontSize = Yanfly.Param.ItemQuantitySize;
    this.drawText('\u00d7' + numItems, x, y, width, 'right');
    this.resetFontSettings();
};

//=============================================================================
// Window_SkillStatus
//=============================================================================

Window_SkillStatus.prototype.refresh = function() {
    this.contents.clear();
	//wolfzq追加代码
	if (this._player) {
		this.removeChild(this._player);
	}
    if (this._actor) {
        var w = this.width - this.padding * 2;
        var h = this.height - this.padding * 2;
        if (!eval(Yanfly.Param.MenuTpGauge)) {
          var y = h / 2 - this.lineHeight() * 1.5;
        } else {
          var y = 0;
        }
        var xpad = Yanfly.Param.WindowPadding + Window_Base._faceWidth;
        var width = w - xpad - this.textPadding();
        this.drawActorFace(this._actor, 0, 0, Window_Base._faceWidth, h);
        this.drawActorSimpleStatus(this._actor, xpad, y, width);
    }
};

Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillTpCost(skill) > 0) {
        this.changeTextColor(this.tpCostColor());
        var skillcost = Yanfly.Util.toGroup(this._actor.skillTpCost(skill));
        this.drawText(skillcost, x, y, width, 'right');
    } else if (this._actor.skillMpCost(skill) > 0) {
        this.changeTextColor(this.mpCostColor());
        var skillcost = Yanfly.Util.toGroup(this._actor.skillMpCost(skill));
        this.drawText(skillcost, x, y, width, 'right');
    }
};

//=============================================================================
// Window_EquipStatus
//=============================================================================

Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
    this.resetTextColor();
    var actorparam = Yanfly.Util.toGroup(this._actor.param(paramId));
    this.drawText(actorparam, x, y, 48, 'right');
};

Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    var actorparam = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, 48, 'right');
};

//=============================================================================
// Window_SkillType
//=============================================================================

Window_SkillType.prototype.makeCommandList = function() {
    if (this._actor) {
        var skillTypes = this._actor.addedSkillTypes();
        skillTypes.sort(function(a, b){return a-b});
		//wolfzq追加去除重名
		oldName =  '';
        skillTypes.forEach(function(stypeId) {
            var name = $dataSystem.skillTypes[stypeId];
			if (oldName != name) {
				oldName = name;
				this.addCommand(name, 'skill', true, stypeId);
			}
        }, this);
    }
};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Window_ActorCommand.prototype.addSkillCommands = function() {
    var skillTypes = this._actor.addedSkillTypes();
    skillTypes.sort(function(a, b){return a-b});
	//wolfzq追加去除重名
	var oldName = '';
    skillTypes.forEach(function(stypeId) {
        var name = $dataSystem.skillTypes[stypeId];
		if (oldName != name) {
			oldName = name;
			this.addCommand(name, 'skill', true, stypeId);
		}
    }, this);
};

//=============================================================================
// Window_Status
//=============================================================================

Window_Status.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 6; i++) {
      var paramId = i + 2;
      var y2 = y + lineHeight * i;
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.param(paramId), x, y2, 160);
      this.resetTextColor();
      var actorParam = Yanfly.Util.toGroup(this._actor.param(paramId));
      var dw = this.textWidth(Yanfly.Util.toGroup(this._actor.paramMax(i + 2)));
      this.drawText(actorParam, x + 160, y2, dw, 'right');
    }
};

Window_Status.prototype.drawExpInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = this._actor.currentExp();
    var value2 = this._actor.nextRequiredExp();
    if (this._actor.isMaxLevel()) {
        value1 = '-------';
        value2 = '-------';
    } else {
      value1 = Yanfly.Util.toGroup(value1);
      value2 = Yanfly.Util.toGroup(value2);
    }
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x, y + lineHeight * 0, 270);
    this.drawText(expNext, x, y + lineHeight * 2, 270);
    this.resetTextColor();
    this.drawText(value1, x, y + lineHeight * 1, 270, 'right');
    this.drawText(value2, x, y + lineHeight * 3, 270, 'right');
};

//=============================================================================
// Window_ShopBuy
//=============================================================================

Window_ShopBuy.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
	var priceWidth = 96;
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
    this.contents.fontSize = Yanfly.Param.GoldFontSize;
    var itemPrice = Yanfly.Util.toGroup(this.price(item));
    this.drawText(itemPrice, rect.x + rect.width - priceWidth, rect.y, priceWidth, 'right');
    this.changePaintOpacity(true);
    this.resetFontSettings();
};

//=============================================================================
// Window_ShopNumber
//=============================================================================

Window_ShopNumber.prototype.drawNumber = function() {
    var x = this.cursorX();
    var y = this.itemY();
    var width = this.cursorWidth() - this.textPadding();
    this.resetTextColor();
    var itemNumber = Yanfly.Util.toGroup(this._number);
    this.drawText(itemNumber, x, y, width, 'right');
};

//=============================================================================
// Window_BattleStatus
//=============================================================================

Window_BattleStatus.prototype.gaugeAreaWidth = function() {
    return this.width / 2 + this.standardPadding();
};

Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
    var minIconArea = Window_Base._iconWidth * 2;
    var nameLength = this.textWidth('0') * 16 + 6;
    var iconWidth = Math.max(rect.width - nameLength, minIconArea);
    var nameWidth = rect.width - iconWidth;
    this.drawActorName(actor, rect.x + 0, rect.y, nameWidth);
    this.drawActorIcons(actor, rect.x + nameWidth, rect.y, iconWidth);
};

Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
    var totalArea = this.gaugeAreaWidth() - 30;
    var hpW = parseInt(totalArea * 108 / 300);
    var otW = parseInt(totalArea * 96 / 300);
    this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
    this.drawActorMp(actor, rect.x + hpW + 15, rect.y, otW);
    this.drawActorTp(actor, rect.x + hpW + otW + 30, rect.y, otW);
};

Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
    var totalArea = this.gaugeAreaWidth() - 15;
    var hpW = parseInt(totalArea * 201 / 315);
    var otW = parseInt(totalArea * 114 / 315);
    this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
    this.drawActorMp(actor, rect.x + hpW + 15,  rect.y, otW);
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Window_BattleLog.prototype.showNormalAnimation = function(targets,
animationId, mirror) {
    var animation = $dataAnimations[animationId];
    if (animation) {
      if (animation.position === 3) {
        targets.forEach(function(target) {
            target.startAnimation(animationId, mirror, 0);
        });
      } else {
          var delay = this.animationBaseDelay();
          var nextDelay = this.animationNextDelay();
          targets.forEach(function(target) {
              target.startAnimation(animationId, mirror, delay);
              delay += nextDelay;
          });
      }
    }
};

//=============================================================================
// New Function
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.toGroup = function(inVal) {
  if (typeof inVal !== 'string') { inVal = String(inVal); }
  if (!eval(Yanfly.Param.DigitGroup)) return inVal;
  return inVal.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
    return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
  });
};

//=============================================================================
// End of File
//=============================================================================