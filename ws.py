# coding=utf-8
from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
try:
    import queue
except ImportError:
    import Queue as queue

stateQueue = queue.Queue()
class SimpleChat(WebSocket):

    clients = []

    def handleMessage(self):
           stateQueue.put(self.clients[0].data)
           print(self.clients[0].data)
           # self.clients[0].sendMessage(u'press!!!!')

    def handleConnected(self):
       print(self.address, 'connected')
       for client in self.clients:
          client.sendMessage(self.address[0] + u' - connected')
       self.clients.append(self)

    def handleClose(self):
       self.clients.remove(self)
       print(self.address, 'closed')
       for client in self.clients:
          client.sendMessage(self.address[0] + u' - disconnected')


    # def create_server(self):
    #     server = SimpleWebSocketServer('127.0.0.1', 8001, SimpleChat)
    #     server.serveforever()
    #     return server

if __name__ == '__main__':
    wsServer = SimpleWebSocketServer('127.0.0.1', 8001, SimpleChat)
    wsServer.serveforever()

