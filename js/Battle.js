/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆██▄▄▃▂
 *  ████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 战斗类
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2018/1/18 18:27 初版
 */
let Battle = {
    normalFight: (enemyId,lv) => {
        //设置团队状态为战斗
        mainTeam.state = 2;
        let enemyTeam = RPG.beget(PlayerTeam);
        enemyTeam.clear();
        for (let i = 0; i < enemyId.length; i++) {
            let id = enemyId[i];
            enemyTeam.addEnemy(id, lv);
        }
        // Lib.bgm('BattleTheme',true);
        Fight.startFight(enemyTeam, mainTeam);
        //战斗结束后回调
        if(!Menu.callback){
            Menu.waitMenu(()=>{
                RPG.popState();
                if (Fight.state === Fight.WIN) {
                } else if (Fight.state === Fight.LOST) {
                    //战败
                } else {
                    // 不胜不败，并不可能
                }
            });
        }

    },
};
