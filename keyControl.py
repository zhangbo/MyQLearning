# -*- coding: utf-8 -*-
import time
from pynput.keyboard import Key, Controller
from pynput import keyboard

kb = Controller()
lastPressKey = Key.esc

def do_action(action):
	global lastPressKey
	if action =='up':
		if lastPressKey != Key.esc and lastPressKey != Key.up:
			kb.release(lastPressKey)
		kb.press(Key.up)
		lastPressKey = Key.up
	elif action == 'left':
		if lastPressKey != Key.esc and lastPressKey != Key.left:
			kb.release(lastPressKey)
		kb.press(Key.left)
		lastPressKey = Key.left
	elif action == 'down':
		if lastPressKey != Key.esc and lastPressKey != Key.down:
			kb.release(lastPressKey)
		kb.press(Key.down)
		lastPressKey = Key.down
	elif action == 'right':
		if lastPressKey != Key.esc and lastPressKey != Key.right:
			kb.release(lastPressKey)
		kb.press(Key.right)
		lastPressKey = Key.right


def keyboard_listener():
	ACTION_KEYS = [Key.up, Key.down, Key.left, Key.right]
	def on_press(key):
		global lastPressKey
		try:
			if key in ACTION_KEYS:
				lastPressKey = key
		except AttributeError:
			if key in ACTION_KEYS:
				lastPressKey = key

	with keyboard.Listener(on_press=on_press) as listener:
		listener.join()
	


# if __name__ == '__main__':
# 	# start_new_thread(keyboard_listener, ())
# 	time.sleep(3)
# 	while True:
# 		do_action('up')
# 		do_action('up')
# 		# do_action('up')
# 		time.sleep(0.1)
# 		do_action('down')
# 		do_action('down')
# 		do_action('down')
# 		time.sleep(0.1)