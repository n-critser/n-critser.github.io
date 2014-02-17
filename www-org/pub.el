(defun pub-org-to-html (filename)
  "publisb the file FILENAME which is of org
   type to be of type html"
  (message "Working on `%s' ... " filename)
  (interactive "FFind file: ")
  (org-publish-to-html (find-file-noselect filename)))
	
;  (org-pushlish-html filename))

;;; https://www.gnu.org/software/emacs/manual/html_mono/eintr.html#Words-in-a-defun

(defun find-file (filename)
  "Edit file FILENAME.
Switch to buffer bisiting file FILENAME,
creating one if none already exists."
  (interactive "FFind file: ")
  (switch-to-buffer (find-file-noselect filename)))


;; fuckedy fuck can't get this to work
(defun files-in-below-directory (directory)
  "List the .org file in DIRECTORY and in its sub-directories."
  ;;interactive for testing
  (interactive "DDirectory name: ")
  (let (org-files-list
	(current-directory-list
	 (directory-files-and-attributes directory t)))
    ;;while in current dir
    (while current-directory-list
      (cond
       ;;does the file end in .org
       ;; if so append it to the list
       ((equal ".org" (substring (car (car current-directory-list)) -3))
	(setq org-files-list
	      (cons (car (car current-directory-list)) org-files-list)))
       ;; is this filename a directory?
       ((eq t (car (cdr (car current-directory-list))))
	;; to recurse or not
	(if
	    (equal "."
		   (substring (car (car current-directory-list)) -1))
	    ;; then do nothing since filename = "." or ".."
	    ()
	  (setq org-files-list
		(append
		 (files-in-below-directory
		  (car (car current-directory-list)))
		 org-files-list)))))
      ;; move to the next filename in the list
      (setq current-directory-list (cdr current-directory-list)))
    ;; return filenames
    org-files-list))