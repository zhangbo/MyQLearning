# -*- coding: utf-8 -*-
import ws
import numpy as np
import pandas as pd

class RL:

    def __init__(self):
        self.episod = 1
        self.actions =['up', 'left', 'down', 'right']       # available actions
        self.epsilon = 0.9999                               # greedy police
        self.alpha  = 0.3                                   # learning rate
        self.gama = 0.9                                     # discount factor
        self.Q_table = pd.DataFrame(columns=self.actions, dtype='float')
        print('-----initial----------')
        print('Episod {num} start'.format(num=self.episod))


    def check_state_exist(self, state):
        if state not in self.Q_table.index:
            # print self.Q_table.index
            self.Q_table = self.Q_table.append(pd.Series([0]*len(self.actions), index=self.Q_table.columns, name=state))

    def choose_action(self, state):
        self.check_state_exist(state)
        state_action = self.Q_table.loc[(state,), :]
        if state_action.ix[state,'click']==0 and state_action.ix[state,'nothing']==0:
            return 'nothing'
        else:
            if (np.random.uniform()>self.epsilon):
                return np.random.choice(self.actions)
            else:
                return state_action.iloc[0,:].argmax()


    def Qlearn(self,state,action,state_,reward):
        self.check_state_exist(state_)
        if reward >= 0:
            self.Q_table.ix[state,action] += self.alpha*(reward + self.gama\
                                                    *self.Q_table.loc[(state_,), :].iloc[0,:].max()
                                                      -self.Q_table.ix[state,action])
        elif reward <0:
            self.Q_table.ix[state,action] += self.alpha*(reward -self.Q_table.ix[state,action])
            self.episod+=1
            print ('Episod {num} start'.format(num=self.episod))
        #      print state,action,reward,self.Q_table.ix[state,action]

    def sarsalearn(self,state,action,state_,action_,reward):
        self.check_state_exist(state_)
        if reward>=0:
            sarsa_error = reward+self.gama*self.Q_table.ix[state_,action_] - self.Q_table.ix[state,action]
        else:
            sarsa_error = reward-self.Q_table.ix[state,action]
            self.episod+=1
            print ('Episod {num} start!!!!!'.format(num=self.episod))

        self.Q_table.ix[state,action] +=self.alpha*sarsa_error
        #print state,action,reward,self.Q_table.ix[state,'click'],self.Q_table.ix[state,'nothing']


# if __name__ == '__main__':
#     rl = RL()
#     time.sleep(3)