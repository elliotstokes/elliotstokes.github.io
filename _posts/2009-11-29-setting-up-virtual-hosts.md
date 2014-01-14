---
layout: post
category : coding
tags : [Apache, Web]
---

I have a few test sites running on my laptop and I wanted to set them up as virtual hosts in Apache to make my life easier. Its pretty simple to do and will probably mirror the production environment more accuratley. I did this on a mac but I am pretty sure the same principles apply to Linux and Windows but paths may be different.

First things first you need to edit your hosts file. You should be able to find this at '/private/etc/hosts'. Wikipedia has a list of the locations of hosts files for other operating systems though if your running on something else. Open the hosts file and create a new line for each site you want to setup along with the IP address to point it at (localhost in this case). I have ended each site in .local rather than .com so not to interfere with normal browsing. Below is a sample hosts file with the added development sites vapidspace.local, othersite.local and anothersite.local.

<pre>
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##

127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost 
fe80::1%lo0	localhost

127.0.0.1 vapidspace.local
127.0.0.1 othersite.local
127.0.0.1 anothersite.local
</pre>

Now thats done you can test this has worked by opening up your browser and browse to http://&lt;yourhost&gt; and check you see the same page as you would when browsing to http://localhost. If that is all working correctly you can now setup your virtual hosts in Apache. The allows us to show a different path when directed from different domains. Browse to your httpd.conf or if it exists your httpd-vhosts.conf. On my machine these exists in the /etc/Apache2 directory. Once you have the file open find the virtual hosts section (It should be commented throughout) and add a virtualhost block for each virtual host. I used something like this:


<pre>
#
# VirtualHost example:
# Almost any Apache directive may go into a VirtualHost container.
# The first VirtualHost section is used for all requests that do not
# match a ServerName or ServerAlias in any  block.
#


  DocumentRoot /Users/&lt;user&gt;/Sites/vapidspace
  ServerName vapidspace.local
  
  DocumentRoot /Users/&lt;user&gt;/Sites/site1
  ServerName othersite.local
  
  DocumentRoot /Users/&lt;user&gt;/Sites/site2
  ServerName anothersite.local
</pre>

The DocumentRoot defines the path to the location of your site, the ServerName is the host that you set up in your hosts file. All you need to do is edit these to match up with your environment and that should be that. Hope it helps somebody.